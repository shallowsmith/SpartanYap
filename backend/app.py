# save this as app.py
from flask import *
from flask_mysqldb import MySQL
import MySQLdb.cursors

app = Flask(__name__)

app.secret_key = 'hey!'

app.config['MYSQL_HOST'] = 'localhost'

mysql = MySQL(app)


#Route for login
@app.route('/login', methods = ['POST' , 'GET'])
def login():
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        #Search for user in database
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM accounts WHERE username = % s AND password = % s', (username, password, ))
        account = cursor.fetchone()
        if account:
            session['loggedin'] = True
            session['username'] = account['username']
            session['id'] = account['id']
            return 'Logged in'
        else:
            msg = 'Username / password not found'
    return render_template('', msg  = msg)


#Route for the register
@app.route('/register', methods =['GET', 'POST'])
def register():
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'email' in request.form:
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
    elif request.method == 'POST':
        msg = 'Fill out the form'
    return render_template('', msg=msg)

#Route for logout
@app.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('loggedin', None)
    session.pop('id, None')
    return redirect(url_for('login'))

if __name__=='__main__':
   app.run(debug=True)

