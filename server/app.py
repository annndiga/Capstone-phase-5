from flask import Flask, request, jsonify,  Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, date
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

ticket_bp = Blueprint('ticket', __name__)

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
    role_name = request.args.get('role_name')  

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
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({'message': 'You have access to this protected route', 'current_user': current_user})

@app.route('/_events', methods=['POST'])
def create_event():
    data = request.get_json()
    if data:
        event_name = data.get('event_name')
        event_description = data.get('event_description')
        # Convert date strings to Python date objects
        start_date = datetime.strptime(data.get('start_date'), '%Y-%m-%d').date()
        end_date = datetime.strptime(data.get('end_date'), '%Y-%m-%d').date()
        location = data.get('location')
        category = data.get('category')
        total_tickets_available = data.get('total_tickets_available')
        early_booking_price = data.get('early_booking_price')
        mvp_price = data.get('mvp_price')
        regular_price = data.get('regular_price')

        new_event = Event(
            event_name=event_name,
            event_description=event_description,
            start_date=start_date,
            end_date=end_date,
            location=location,
            category=category,
            total_tickets_available=total_tickets_available,
            early_booking_price=early_booking_price,
            mvp_price=mvp_price,
            regular_price=regular_price
        )

        db.session.add(new_event)
        db.session.commit()

        return jsonify({'message': 'Event created successfully'}), 201
    else:
        return jsonify({'error': 'Invalid data for event creation'}), 400


@app.route('/search_events', methods=['GET'])
def search_events():
    
    event_name = request.args.get('event_name')
    category = request.args.get('category')
    location = request.args.get('location')

    
    base_query = Event.query

    
    if event_name:
        base_query = base_query.filter(Event.event_name.ilike(f"%{event_name}%"))

    if category:
        base_query = base_query.filter(Event.category.ilike(f"%{category}%"))

    if location:
        base_query = base_query.filter(Event.location.ilike(f"%{location}%"))

    
    matching_events = base_query.all()

   
    serialized_events = [{
        'event_name': event.event_name,
        'event_description': event.event_description,
        'start_date': event.start_date.strftime('%Y-%m-%d'),
        'end_date': event.end_date.strftime('%Y-%m-%d'),
        'location': event.location,
        'category': event.category,
        'total_tickets_available': event.total_tickets_available,
        'early_booking_price': float(event.early_booking_price),
        'mvp_price': float(event.mvp_price),
        'regular_price': float(event.regular_price)
    } for event in matching_events]

    return jsonify({'events': serialized_events})

@app.route('/add_to_calendar', methods=['POST'])
def add_to_calendar():
    data = request.get_json()

    if not data:
        return jsonify({"message": "Invalid data"}), 400

    user_id = data.get('user_id')  
    event_id = data.get('event_id') 

    
    user = User.query.get(user_id)
    event = Event.query.get(event_id)

    if not user or not event:
        return jsonify({"message": "User or event not found"}), 404

    
    event_calendar = EventCalendar(event_id=event_id, customer_id=user_id, is_added=True)

    
    db.session.add(event_calendar)
    db.session.commit()

    return jsonify({"message": "Event added to the calendar successfully"}), 201

@app.route('/buy_tickets', methods=['POST'])
def buy_tickets():
    data = request.json
    event_id = data['event_id']
    customer_id = data['customer_id']
    ticket_type = data['ticket_type']
    payment_status = 'Paid'
    payment_method = data['payment_method']

    # Check if the event exists
    event = Event.query.get(event_id)
    if event is None:
        return jsonify({'error': 'Event does not exist'}), 404

    # Create a new Ticket object with the current date as the purchase_date
    ticket = Ticket(
        event_id=event_id,
        customer_id=customer_id,
        ticket_type=ticket_type,
        purchase_date=date.today(),
        payment_status=payment_status,
        payment_method=payment_method
    )

    try:
        db.session.add(ticket)
        db.session.commit()
        return jsonify({'message': 'Ticket purchased successfully!'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to purchase ticket', 'details': str(e)})

@ticket_bp.route('/view_tickets', methods=['GET'])
@jwt_required()
def view_tickets():
    current_user = get_jwt_identity()  
    user = User.query.filter_by(email=current_user).first()
    
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    
    tickets = Ticket.query.filter_by(customer_id=user.id).all()

   
    ticket_data = []
    for ticket in tickets:
        ticket_data.append({
            'event_id': ticket.event_id,
            'ticket_type': ticket.ticket_type,
            'purchase_date': ticket.purchase_date.strftime('%Y-%m-%d'),
            'payment_status': ticket.payment_status,
            'payment_method': ticket.payment_method
        })

    return jsonify({'tickets': ticket_data})

@app.route('/mpesa_authorization', methods=['GET'])
def mpesa_authorization():
    # Define the Safaricom M-Pesa API authorization URL
    mpesa_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate"
    
    # Set the grant_type
    querystring = {"grant_type": "client_credentials"}

    # Set the client ID and client secret
    client_id = "YourClientID"
    client_secret = "YourClientSecret"

    # Base64 encode the client ID and client secret
    credentials = f"{client_id}:{client_secret}"
    encoded_credentials = base64.b64encode(credentials.encode()).decode('utf-8')

    # Set the request headers, including the "Authorization" header
    headers = {
        "Authorization": f"Basic {encoded_credentials}"
    }

    # Make the HTTP GET request to obtain the access token
    response = requests.get(mpesa_url, headers=headers, params=querystring)
    
    # Check the response status code and handle the response
    if response.status_code == 200:
        access_token = response.json().get('access_token')
        return jsonify({"access_token": access_token})
    else:
        return jsonify({"error": "Failed to obtain access token"})




app.register_blueprint(ticket_bp)


if __name__ == '__main__':
    app.run(debug=True)

