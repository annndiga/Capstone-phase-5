from flask import Flask, request, jsonify,  Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from config import db
from model.event import Event
from model.eventcalendar import EventCalendar
from model.role import Role
from model.user import User
from model.ticket import Ticket




app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '45678'

db.init_app(app)

migrate = Migrate(app, db)

jwt = JWTManager(app)



@app.route('/')
def hello():
    return 'Welcome, Ticket Tamasha!'

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = [{'id': user.id, 'username': user.username, 'email': user.email} for user in users]
    return jsonify(user_list)

@app.route('/user/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if user:
        user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "user_role_id": user.user_role_id,
            "user_role": user.user_role.role_name if user.user_role else None,
        }
        return jsonify(user_data)
    else:
        return jsonify({"message": "User not found"}), 404


@app.route('/users-by-role', methods=['GET'])
def get_users_by_role():
    role_name = request.args.get('role_name')  # Get the role name from the query parameter

    if not role_name:
        return jsonify({'error': 'Role name is required'}), 400

    role = Role.query.filter_by(role_name=role_name).first()
    if role:
        users = User.query.filter_by(user_role=role).all()
        user_list = [{'id': user.id, 'username': user.username} for user in users]
        return jsonify({'users': user_list})
    else:
        return jsonify({'users': []})

@app.route('/user-role/<int:user_id>', methods=['GET'])
def get_user_role(user_id):
    user = User.query.get(user_id)
    if user:
        role = user.user_role.role_name
        return jsonify({"user_id": user_id, "role": role})
    else:
        return jsonify({"message": "User not found"}), 404      


@app.route('/create-user', methods=['POST'])
def create_user():
    data = request.get_json()
    if data:
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        role_name = data.get('role_name')  

        
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({"message": "User with that username already exists"}), 400

       
        role = Role.query.filter_by(role_name=role_name).first()
        if not role:
            role = Role(role_name=role_name)
            db.session.add(role)

      
        new_user = User(username=username, password=password, email=email, user_role=role)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User created successfully"}), 201
    else:
        return jsonify({"message": "Invalid data"}), 400
      

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'message': 'Please provide both email and password'}), 400

    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=email)
        return jsonify({'access_token': access_token}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'message': 'Please provide both email and password'}), 400

    email = data['email']
    password = data['password']

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({'message': 'User with that email already exists'}), 409

    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/protected', methods=['GET'])
@jwt_required
def protected():
    current_user = get_jwt_identity()
    return jsonify({'message': 'You have access to this protected route', 'current_user': current_user})





if __name__ == '__main__':
    app.run(debug=True)

