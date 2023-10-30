from app import app, db  # Import the Flask app and SQLAlchemy instance
from model.event import Event
from model.eventcalendar import EventCalendar
from model.ticket import Ticket
from model.user import User
from model.role import Role
from datetime import datetime  # Import the datetime module

# Create sample data and insert it into the database
def seed_data():
    with app.app_context():  # Create an application context
        # Create roles
        role1 = Role(role_name='Organizer')
        role2 = Role(role_name='Customer')

        # Create users
        user1 = User(username='organizer1', password='hashed_password1', email='organizer1@example.com', user_role=role1)
        user2 = User(username='customer1', password='hashed_password2', email='customer1@example.com', user_role=role2)

        # Create events with date objects
        start_date1 = datetime(2023, 10, 26)
        end_date1 = datetime(2023, 10, 27)
        event1 = Event(
            organizer=user1,
            event_name='Event 1',
            event_description='Description 1',
            start_date=start_date1,
            end_date=end_date1,
            location='Location 1',
            category='Category 1',
            total_tickets_available=100,
            early_booking_price=50.0,
            mvp_price=70.0,
            regular_price=90.0
        )

        # Create tickets
        ticket1 = Ticket(event=event1, customer=user2, ticket_type='Early Booking', purchase_date=datetime(2023, 10, 20), payment_status='Paid', payment_method='MPESA STK')

        # Create event calendar entries
        event_calendar1 = EventCalendar(event=event1, customer=user2, is_added=True)

        # Add data to the session
        db.session.add(role1)
        db.session.add(role2)
        db.session.add(user1)
        db.session.add(user2)
        db.session.add(event1)
        db.session.add(ticket1)
        db.session.add(event_calendar1)

        # Commit the changes to the database
        db.session.commit()

if __name__ == '__main__':
    seed_data()
