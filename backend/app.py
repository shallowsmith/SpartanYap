from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from dotenv import load_dotenv
import os
import jwt
import pytz
from datetime import datetime, timedelta
from functools import wraps

load_dotenv()

# Initialize the Flask application
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing for all domains on all routes
CORS(app, resources={r"/*": {"origins": "*", "methods": "*", "headers": "*"}})

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

# Define the Post model using SQLAlchemy
class Post(db.Model):
    __tablename__ = 'posts'
    postid = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default= datetime.utcnow, nullable=False)
    anonymousflag = db.Column(db.Boolean, default=True, nullable=False)
    userid = db.Column(db.Integer, db.ForeignKey('users.userid'))

    def to_dict(self):
        return {
        'postid': self.postid,
        'content': self.content,
        'timestamp': self.timestamp,
        'anonymousflag': self.anonymousflag,
        'userid': self.userid
    }

# Define the Comment model using SQLAlchemy
class Comment(db.Model):
    __tablename__ = 'comments'
    commentid = db.Column(db.Integer, primary_key=True)
    postid = db.Column(db.Integer, db.ForeignKey('posts.postid'))
    userid = db.Column(db.Integer, db.ForeignKey('users.userid'))
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'commentid': self.commentid,
            'postid': self.postid,
            'userid': self.userid,
            'content': self.content,
            'timestamp': self.timestamp
        }

class Reaction(db.Model):
    __tablename__= 'reactions'
    reactionid = db.Column(db.Integer, primary_key=True)
    postid = db.Column(db.Integer, db.ForeignKey('posts.postid'), nullable=True)
    userid = db.Column(db.Integer, db.ForeignKey('users.userid'))  
    type = db.Column(db.String(10), nullable=False)  # 'Like' or 'Dislike'
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)


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

#Route to add reaction to the comment '''
@app.route('/toggle_reaction', methods=['POST'])
@token_required
def toggle_reaction(currentuser):
    data = request.get_json()
    postid = data.get('postid')
    reactiontype = data.get('type', None)  # Expect 'Like' or 'Dislike'

    if not reactiontype or reactiontype not in ['Like', 'Dislike']:
        return jsonify({'message': 'Invalid reaction type'}), 400

    target = Post.query.get(postid)
    if not target:
        return jsonify({'message': 'Post not found'}), 404

    # Check if the user already has a reaction on this target
    reaction = Reaction.query.filter_by(
        userid=currentuser.userid,
        postid=postid,
    ).first()

    if reaction:
        if reaction.type == reactiontype:
            # User is undoing their reaction
            db.session.delete(reaction)
            db.session.commit()
            return jsonify({'message': 'Reaction removed successfully'}), 200
        else:
            # Changing the reaction type
            reaction.type = reactiontype
    else:
        # New reaction
        reaction = Reaction(
            postid=postid,
            userid=currentuser.userid,
            type=reactiontype
        )
        db.session.add(reaction)

    db.session.commit()
    return jsonify({'message': 'Reaction updated successfully'}), 200

#API for returning the reaction
@app.route('/get_reaction', methods= ['GET'])
@token_required
def get_reaction(current_user):
    post_id = request.args.get('postid', type=int)
    print(f"User ID: {current_user.userid}, Post ID: {post_id}")

    if not post_id:
        return jsonify({'error': 'Missing post ID'}), 400

    # Query for the existing reaction using only the authenticated user's ID
    reaction = Reaction.query.filter_by(userid=current_user.userid, postid=post_id).first()
    if reaction:
        return jsonify({
            'reaction_id': reaction.reactionid,
            'post_id': reaction.postid,
            'user_id': current_user.userid,  # Use authenticated user's ID
            'type': reaction.type,
            'timestamp': reaction.timestamp.isoformat()
        }), 200
    else:
        return jsonify({'message': 'No reaction found'}), 404

# API for handling the create post process
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


# API for fetching all posts for feed
@app.route('/get_posts', methods=['GET'])
def get_posts():
    try:
        #Return posts by time they were posted
        posts = Post.query.order_by(Post.timestamp.desc()).all()
        return jsonify([post.to_dict() for post in posts]), 200
    except Exception as e:
        return jsonify({'message': 'Unable to query posts'}), 500

# API for fetching single post
@app.route('/get_post/<int:postid>', methods=['GET'])
def get_post(postid):
    try:
        post = Post.query.get(postid)
        if post:
            return jsonify(post.to_dict()), 200
        else:
            return jsonify({'message': 'Post not found'}), 404
    except Exception as e:
        return jsonify({'message': 'Unable to query post', 'error': str(e)}), 500

# API for handling login
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


# API for handling the signup process
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


# API for handling logout process
@app.route('/logout', methods=['POST'])
@token_required
def logout():
    return jsonify({'message': 'Logout successful.'}), 200

# API for handling adding comment
@app.route('/add_comment', methods=['POST'])
@token_required
def add_comment(user):
    try:
        data = request.get_json()
        new_comment = Comment(
            postid=data['postid'],
            userid=user.userid, 
            content=data['content']
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify({'message': 'Comment added successfully', 'comment': new_comment.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to add comment', 'error': str(e)}), 400


# API for fetching comments
@app.route('/get_comments/<int:postid>', methods=['GET'])
def get_comments(postid):
    try:
        comments = Comment.query.filter_by(postid=postid).order_by(Comment.timestamp.desc()).all()
        return jsonify([comment.to_dict() for comment in comments]), 200
    except Exception as e:
        return jsonify({'message': 'Failed to fetch comments', 'error': str(e)}), 500

# API for searching posts
@app.route('/search_posts', methods=['GET'])
def search_posts():
    try:
        search_query = request.args.get('query')
        if not search_query:
            return jsonify({'message': 'Query parameter "query" is required'}), 400

        search_results = Post.query.filter(
            (Post.content.ilike(f"%{search_query}%"))
        ).all()

        return jsonify([post.to_dict() for post in search_results]), 200
    except Exception as e:
        return jsonify({'message': 'Failed to search posts', 'error': str(e)}), 500



@app.route('/')
def home():
    return "Hello, world!"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)