from app import app, db  
from model.event import Event
from model.eventcalendar import EventCalendar
from model.ticket import Ticket
from model.user import User
from model.role import Role
from datetime import datetime 
from faker import Faker


# Create an instance of the Faker class
fake = Faker()

with app.app_context():
    def create_roles():
        for _ in range(5):  # Create 5 roles
            role = Role(name=fake.word())
            db.session.add(role)
        db.session.commit()

    def create_users():
        for _ in range(10):  # Create 10 users
            user = User(
                username=fake.user_name(),
                password=fake.password(),
                email=fake.email(),
                user_role_id=fake.random_int(min=1, max=5)  # Assuming role IDs start from 1 and go up to 5
            )
            db.session.add(user)
        db.session.commit()

    def create_events():
        for _ in range(10):  # Create 10 events
            event = Event(
                organizer_id=fake.random_int(min=1, max=10),  # Assuming user IDs start from 1 and go up to 10
                event_name=fake.word(),
                event_description=fake.text(),
                start_date=fake.date_time_between(start_date="-30d", end_date="+30d"),
                end_date=fake.date_time_between(start_date="+31d", end_date="+60d"),
                location=fake.city(),
                category=fake.word(),
                total_tickets_available=fake.random_int(min=100, max=1000),
                early_booking_price=fake.random_element(elements=(10.0, 20.0, 30.0)),
                mvp_price=fake.random_element(elements=(40.0, 50.0, 60.0)),
                regular_price=fake.random_element(elements=(70.0, 80.0, 90.0))
            )
            db.session.add(event)
        db.session.commit()

    def create_tickets():
        for _ in range(20):  # Create 20 tickets
            ticket = Ticket(
                event_id=fake.random_int(min=1, max=10),  # Assuming event IDs start from 1 and go up to 10
                customer_id=fake.random_int(min=1, max=10),  # Assuming user IDs start from 1 and go up to 10
                ticket_type=fake.random_element(elements=("VIP", "Regular")),
                purchase_date=fake.date_time_between(start_date="-30d", end_date="now"),
                payment_status=fake.random_element(elements=("Pending", "Paid")),
                payment_method=fake.random_element(elements=("Credit Card", "PayPal", "Cash"))
            )
            db.session.add(ticket)
        db.session.commit()

    def create_event_calendar():
        for _ in range(10):  # Create 10 calendar events
            calendar_event = EventCalendar(
                event_id=fake.random_int(min=1, max=10),  # Assuming event IDs start from 1 and go up to 10
                customer_id=fake.random_int(min=1, max=10),  # Assuming user IDs start from 1 and go up to 10
                is_added=fake.boolean()
            )
            db.session.add(calendar_event)
        db.session.commit()

    if __name__ == "__main__":
        with app.app_context():
            create_roles()
            create_users()
            create_events()
            create_tickets()
            create_event_calendar()          