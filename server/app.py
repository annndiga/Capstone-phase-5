from flask import Flask, request, jsonify, make_response, redirect, url_for,render_template
from Backend.models import User, Event, Ticket, EventCalendar, Role
from config import db, app, csrf
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import datetime


@app.route('/home')
def home():
    return 'Welcome to the Event Management System!'

#api for login in for the user to get the access token
@app.route('/api/login', methods=['POST'])
def login():
    if request.is_json:
        username = request.json['username']
        password = request.json['password']
    else:
        username = request.form['username']
        password = request.form['password']
    user = User.query.filter_by(username=username, password=password).first()
    if user:
        access_token = create_access_token(identity=user.username)
        return jsonify(message="Login succeeded!", access_token=access_token), 200
    else:
        return jsonify(message="Bad username or password"), 401

#api for registering a new user
@app.route('/api/register', methods=['POST'])
def register():
    if request.is_json:
        username = request.json['username']
        password = request.json['password']
        email = request.json['email']
    else:
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify(message="Username already exists"), 409
    else:
        new_user = User(username=username, password=password, email=email)
        new_user.save()
        access_token = create_access_token(identity=new_user.username)
        return jsonify(message="User created successfully!", access_token=access_token), 201

#api to get all events in the platform
@app.route('/api/events', methods=['GET', 'POST'])
# @jwt_required
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

#api to get a single user
@app.route('/api/users/<user_id>', methods=['GET'])
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

#api to be able to see all tickets in the platforms with their respective events
@app.route('/api/tickets', methods=['GET', 'POST'])
# @jwt_required
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
    elif request.method == 'POST':
        if request.is_json:
            event_id = request.json['event_id']
            customer_id = request.json['customer_id']
            ticket_type = request.json['ticket_type']
            purchase_date = request.json['purchase_date']
            payment_status = request.json['payment_status']
            payment_method = request.json['payment_method']
        else:
            event_id = request.form['event_id']
            customer_id = request.form['customer_id']
            ticket_type = request.form['ticket_type']
            purchase_date = request.form['purchase_date']
            payment_status = request.form['payment_status']
            payment_method = request.form['payment_method']
        ticket = Ticket.query.filter_by(event_id=event_id).first()
        if ticket:
            return make_response(jsonify(message="Ticket already exists"), 409)
        else:
            new_ticket = Ticket(event_id=event_id, customer_id=customer_id, ticket_type=ticket_type, purchase_date=purchase_date, payment_status=payment_status, payment_method=payment_method)
            new_ticket.save()
            return make_response(jsonify(message="Ticket created successfully!"), 201)
#api to get a single ticket
@app.route('/api/tickets/<ticket_id>', methods=['GET'])
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
# @jwt_required
@app.route('/api/calendar', methods=['GET', 'POST'])
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

#api to get a single calendar event
@app.route('/api/calendar/<calendar_event_id>', methods=['GET'])
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
    db.create_all()
    app.run(debug=True)