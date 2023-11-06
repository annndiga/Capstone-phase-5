from flask import Flask, request, jsonify, make_response, redirect, url_for,render_template,Blueprint
from Backend.models import User, Event, Ticket, EventCalendar, Role, TokenBlocklist
from config import db, app, csrf,jwt
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required,create_refresh_token, get_jwt,current_user
import datetime
import os

auth_bp = Blueprint('auth', __name__)


# Define the routes for the auth_bp blueprint here
#api to register a new user
@auth_bp.route('/register', methods=['POST'])
def register():
    if request.is_json:
        username = request.json['username']
        password = request.json['password']
        email = request.json['email']
    else:
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
    data = request.get_json()
    user = User.get_user_by_username(username=data.get('username'))
    if user:
        return jsonify(message="Username already exists"), 409
    else:
        new_user = User(username=username, password=password, email=email)
        new_user.save()
        new_user.set_password(data.get('password'))
        access_token = create_access_token(identity=new_user.username)
        return jsonify(message="User created successfully!", access_token=access_token), 201

#api to login the new or existing user           
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.get_user_by_username(username=data.get('username'))
    if user is None:
        return jsonify(message="Bad username or password"), 401
    if user.check_password(data.get('password')):
        access_token = create_access_token(identity=user.username)
        refresh_token = create_refresh_token(identity=user.username)
        return jsonify({
                        "message":"Login succeeded!", 
                        "tokens": {
                             "access_token": access_token,
                             "refresh_token": refresh_token
                        }
                        
                        }), 200
    return jsonify(message="Invalid username or paasword"), 401
              
#handling the jwt claims by seeing what token belongs to a user 
@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
     return jsonify({
          "message":"You are authorized to access this endpoint",
          "user details": {"username": current_user.username, "email":current_user.email}
          }), 200

#api to test refresh tokens 
@auth_bp.route('/refresh', methods=['GET'])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    new_access_token = create_access_token(identity=identity)
    return jsonify({"access_token":new_access_token}), 200

#api to logout a user from the system and revoke their access token
@auth_bp.route('/logout', methods=['GET'])
@jwt_required()
def logout_user():
    jwt = get_jwt()
    jti = jwt["jti"]
    token_type = jwt["type"]
    token = TokenBlocklist(jti=jti)
    token.save()
    return jsonify({"message":f"Successfully logged out and {token_type} token revoled successfully"}), 200
# Register the blueprint with the Flask application
app.register_blueprint(auth_bp, url_prefix='/auth')


#jwt decorators for protecting the various routes
#automated userloading
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(username=identity).one_or_none()
     
#jwt error handling
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({
        "message": "The token has expired.",
        "error": "token_expired"
    }), 401
@jwt.invalid_token_loader
def invalid_token_callback(error):
     return jsonify({
        "message": "Signature verofication failed",
        "error": "invalid_token"
    }), 401

@jwt.unauthorized_loader
def missing_token_callback(error):
     return jsonify({
        "message": "Request does not contain an access token",
        "error": "authorization_required"
     }), 401

@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, jwt_data):
    jti = jwt_data["jti"]
    token = TokenBlocklist.query.filter_by(jti=jti).first()

    return token is not None

#additional claims for any access control duties such as ADMIN
# @jwt.additional_claims_loader
# def make_additioanl_claims(identity):
#     user = User.get_user_by_username(username=identity)
#     return {
#         "role": user.role.name
#     }    




@app.route('/home')
def home():
    return 'Welcome to the Event Management System!'

# #api to get all events in the platform
@app.route('/api/events', methods=['GET', 'POST'])
@jwt_required()
def events():
    if request.method == 'GET':
        events = Event.query.all()
        results = [
            {
                "id": event.id,
                "organizer_id": event.organizer_id,
                "event_name": event.event_name,
                "event_description": event.event_description,
                "start_date": event.start_date,
                "end_date": event.end_date,
                "location": event.location,
                "category": event.category,
                "total_tickets_available": event.total_tickets_available,
                "early_booking_price": event.early_booking_price,
                "mvp_price": event.mvp_price,
                "regular_price": event.regular_price
            } for event in events]
        return jsonify(results)
    elif request.method == 'POST':
        if request.is_json:
            organizer_id = request.json['organizer_id']
            event_name = request.json['event_name']
            event_description = request.json['event_description']
            start_date = request.json['start_date']
            end_date = request.json['end_date']
            location = request.json['location']
            category = request.json['category']
            total_tickets_available = request.json['total_tickets_available']
            early_booking_price = request.json['early_booking_price']
            mvp_price = request.json['mvp_price']
            regular_price = request.json['regular_price']
        else:
            organizer_id = request.form['organizer_id']
            event_name = request.form['event_name']
            event_description = request.form['event_description']
            start_date = request.form['start_date']
            end_date = request.form['end_date']
            location = request.form['location']
            category = request.form['category']
            total_tickets_available = request.form['total_tickets_available']
            early_booking_price = request.form['early_booking_price']
            mvp_price = request.form['mvp_price']
            regular_price = request.form['regular_price']
        event = Event.query.filter_by(event_name=event_name).first()
        if event:
            return jsonify({'message':"Event already exists"}), 409
        else:
            new_event = Event(organizer_id=organizer_id, event_name=event_name, event_description=event_description, start_date=start_date, end_date=end_date, location=location, category=category, total_tickets_available=total_tickets_available, early_booking_price=early_booking_price, mvp_price=mvp_price, regular_price=regular_price)
            new_event.save()
            return jsonify(message="Event created successfully!"), 201

#an api to get all users in the platform
@app.route('/api/users', methods=['GET'])
@jwt_required()
def users():
    if request.method == 'GET':
        users = User.query.all()
        results = [
            {
                "id": user.id,
                "username": user.username,
                "password": user.password,
                "email": user.email,
                "user_role_id": user.user_role_id
            } for user in users]
        return jsonify(results)

# #api to get a single user
@app.route('/api/users/<user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user:
        result = {
            "id": user.id,
            "username": user.username,
            "password": user.password,
            "email": user.email,
            "user_role_id": user.user_role_id
        }
        return jsonify(result), 200
    else:
        return make_response(jsonify(message="User Not Found"), 404)

# #api to be able to see all tickets in the platforms with their respective events
@app.route('/api/tickets', methods=['GET'])
@jwt_required()
def tickets():
    if request.method == 'GET':
        tickets = Ticket.query.all()
        results = [
            {
                "id": ticket.id,
                "event_id": ticket.event_id,
                "customer_id": ticket.customer_id,
                "ticket_type": ticket.ticket_type,
                "purchase_date": ticket.purchase_date,
                "payment_status": ticket.payment_status,
                "payment_method": ticket.payment_method
            } for ticket in tickets]
        return jsonify(results)
        

#api to get a single ticket
@app.route('/api/tickets/<ticket_id>', methods=['GET'])
@jwt_required()
def get_ticket(ticket_id):
    ticket = Ticket.query.filter_by(id=ticket_id).first()
    if ticket:
        result = {
            "id": ticket.id,
            "event_id": ticket.event_id,
            "customer_id": ticket.customer_id,
            "ticket_type": ticket.ticket_type,
            "purchase_date": ticket.purchase_date,
            "payment_status": ticket.payment_status,
            "payment_method": ticket.payment_method
        }
        return jsonify(result), 200
    else:
        return make_response(jsonify(message="That ticket does not exist"), 404)

#api to see all calender events in the platform
@app.route('/api/calendar', methods=['GET', 'POST'])
@jwt_required()
def calendar():
    if request.method == 'GET':
        calendar_events = EventCalendar.query.all()
        results = [
            {
                "id": calendar_event.id,
                "event_id": calendar_event.event_id,
                "customer_id": calendar_event.customer_id,
                "is_added": calendar_event.is_added
            } for calendar_event in calendar_events]
        return jsonify(results)
    elif request.method == 'POST':
        if request.is_json:
            event_id = request.json['event_id']
            customer_id = request.json['customer_id']
            is_added = request.json['is_added']
        else:
            event_id = request.form['event_id']
            customer_id = request.form['customer_id']
            is_added = request.form['is_added']
        calendar_event = EventCalendar.query.filter_by(event_id=event_id).first()
        if calendar_event:
            return make_response(jsonify(message="Event already exists"), 409)
        else:
            new_calendar_event = EventCalendar(event_id=event_id, customer_id=customer_id, is_added=is_added)
            new_calendar_event.save()
            return make_response(jsonify(message="Event created successfully!"), 201)

# #api to get a single calendar event
@app.route('/api/calendar/<calendar_event_id>', methods=['GET'])
@jwt_required()
def get_calendar_event(calendar_event_id):
    calendar_event = EventCalendar.query.filter_by(id=calendar_event_id).first()
    if calendar_event:
        result = {
            "id": calendar_event.id,
            "event_id": calendar_event.event_id,
            "customer_id": calendar_event.customer_id,
            "is_added": calendar_event.is_added
        }
        return jsonify(result), 200
    else:
        return make_response(jsonify(message="That calendar event does not exist"), 404)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        app.run(debug=True)