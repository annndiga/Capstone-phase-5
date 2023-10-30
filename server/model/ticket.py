from config import db

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'))
    event = db.relationship('Event', backref='tickets')
    customer_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    customer = db.relationship('User', backref='purchased_tickets')
    ticket_type = db.Column(db.String(255))
    purchase_date = db.Column(db.Date)
    payment_status = db.Column(db.String(255))
    payment_method = db.Column(db.String(255))