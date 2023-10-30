from config import db

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    organizer_id = db.Column(db.Integer, db.ForeignKey('user.id'))
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