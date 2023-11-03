from config import db

class Role(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))

    def save(self):
        db.session.add(self)
        db.session.commit()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255))
    password = db.Column(db.String(255))
    email = db.Column(db.String(255))
    user_role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    role = db.relationship('Role', backref='roles')

    def save(self):
        db.session.add(self)
        db.session.commit()

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    organizer_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    organizer = db.relationship('User', backref='events')
    event_name = db.Column(db.String(255))
    event_description = db.Column(db.String(255))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    location = db.Column(db.String(255))
    category = db.Column(db.String(255))
    total_tickets_available = db.Column(db.Integer)
    early_booking_price = db.Column(db.Numeric(10, 2))
    mvp_price = db.Column(db.Numeric(10, 2))
    regular_price = db.Column(db.Numeric(10, 2))
    
    def save(self):
        db.session.add(self)
        db.session.commit()

class Ticket(db.Model):
    __tablename__ = 'tickets'

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    event = db.relationship('Event', backref='tickets')
    customer_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    customer = db.relationship('User', backref='purchased_tickets')
    ticket_type = db.Column(db.String(255))
    purchase_date = db.Column(db.Date)
    payment_status = db.Column(db.String(255))
    payment_method = db.Column(db.String(255))

class EventCalendar(db.Model):
    __tablename__ = 'event_calendar'

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    event = db.relationship('Event', backref='event_calendar')
    customer_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    customer = db.relationship('User', backref='calendar_events')
    is_added = db.Column(db.Boolean)