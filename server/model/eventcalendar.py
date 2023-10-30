from config import db

class EventCalendar(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'))
    event = db.relationship('Event', backref='event_calendar')
    customer_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    customer = db.relationship('User', backref='calendar_events')
    is_added = db.Column(db.Boolean)