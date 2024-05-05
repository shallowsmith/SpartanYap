from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from datetime import datetime
from dotenv import load_dotenv
import os
import jwt
from datetime import datetime, timedelta
from functools import wraps

load_dotenv()

# Initialize the Flask application
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing for all domains on all routes
CORS(app, supports_credentials=True)

# Database configuration using SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy with Flask app
db = SQLAlchemy(app)

#Secret Key
app.config['SECRET_KEY'] = 'key'

# Define the User model using SQLAlchemy

class User(db.Model):
    __tablename__ = 'users'
    userid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    posts = db.relationship('Post', backref = 'author', lazy = 'dynamic')
    signupdate = db.Column(db.DateTime, default=datetime.utcnow)

    def verify_password(self, password):
        return check_password_hash(self.password, password)

    def to_json(self):
        return {
            "userid": self.userid,
            "username": self.username,
            "password": self.password,
            "email": self.email,
        }

class Post(db.Model):
    __tablename__ = 'posts'
    postid = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    anonymousflag = db.Column(db.Boolean, default=True, nullable=False)
    userid = db.Column(db.Integer, db.ForeignKey('users.userid'))

#Authenticator for token, checks for a token in authorization header
#Fetches the user ID
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token')

        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            # Decode the token
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            print("Decoded data:", data)  # Debug output
            current_user = User.query.filter_by(userid=data['user_id']).first()
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except Exception as e:
            print("Error decoding token:", str(e))  # More detailed error
            print("Received token:", token)  # Debug output
            return jsonify({'message': 'Token is invalid'}), 401

        return f(current_user, *args, **kwargs)

    return decorated

#Route for handling the create post process
@app.route('/create_post', methods = ["POST"])
@token_required
def create_post(user):
    print(request.json) 
    post_content = request.json.get('content')
    print(post_content)
    if not post_content:
        return jsonify({"message": "Can't post empty text"}), 400
    new_post = Post(content=post_content, author=user)
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"message": "Post added successfully"}), 201

#Route for handling login
@app.route('/login', methods = ['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    if not username or not password:
        return jsonify({'message': 'Both username and password are required'}), 400

    user = User.query.filter_by(username=username).first()

    if user and user.verify_password(password):
        #Generate a 30 minute token for successful login
        token = jwt.encode(
            {'user_id': user.userid, 'exp': datetime.utcnow() + timedelta(minutes=30)}, app.config['SECRET_KEY'], algorithm="HS256")
        print("Token to be sent", token)
        return jsonify({'message': 'Login successful', 'user': {'id': user.userid, 'username': user.username, 'token': token}}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401


# Route for handling the signup process
@app.route('/signup', methods=['POST'])
def signup():
    username = request.json['username']
    password = request.json['password']
    email = request.json['email']

    if not username or not password or not email:
        return (
            jsonify({"message": "You must include a first name, last name and email"}),
            400,
        )
    # Hash the password for security
    hashed_password = generate_password_hash(password)

    # Create new user instance
    new_user = User(username = username, password = hashed_password, email = email)

    # Add to the database
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# Route for handling logout process
@app.route('/logout', methods=['POST'])
@token_required
def logout():
    return jsonify({'message': 'Logout successful.'}), 200

@app.route('/')
def home():
    return "Hello, world!"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)

