import unittest
import json
import sys
sys.path.append('/home/steve/Development/code/Capstone-phase-5/server')
from Backend.models import Event, User
from config import app, db


class TestAPI(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def tearDown(self):
        # Clean up resources or databases if needed
        pass

    def test_login_valid_credentials(self):
        with self.app as client:
            user_data = {
                "username": "testuser",
                "password": "testpassword",
                "email": "testuser@example.com"
            }
            client.post('/api/register', json=user_data)
            login_data = {
                "username": "testuser",
                "password": "testpassword"
            }
            response = client.post('/api/login', json=login_data)
            assert response.status_code == 200
            assert response.json['access_token'] is not None

    def test_login_invalid_credentials(self):
        with self.app as client:
            user_data = {
                "username": "testuser",
                "password": "testpassword",
                "email": "testuser@example.com"
            }
            client.post('/api/register', json=user_data)
            login_data = {
                "username": "testuser",
                "password": "wrongpassword"
            }
            response = client.post('/api/login', json=login_data)
            assert response.status_code == 401
            assert response.json['message'] == "Bad username or password"

    def test_register_new_user(self):
        with self.app as client:
            user_data = {
                "username": "testuser",
                "password": "testpassword",
                "email": "testuser@example.com"
            }
            response = client.post('/api/register', json=user_data)
            assert response.status_code == 200
            assert response.json['message'] == "User created successfully!"
            assert User.query.filter_by(username="testuser").first() is not None

    def test_register_existing_user(self):
        with self.app as client:
            user_data = {
                "username": "testuser",
                "password": "testpassword",
                "email": "testuser@example.com"
            }
            client.post('/api/register', json=user_data)
            response = client.post('/api/register', json=user_data)
            assert response.status_code == 409
            assert response.json['message'] == "Username already exists"

    def test_register_invalid_data(self):
        with self.app as client:
            user_data = {
                "username": "testuser",
                "password": "testpassword",
                "email": "invalidemail"
            }
            response = client.post('/api/register', json=user_data)
            assert response.status_code == 400
            assert response.json['message'] == "Invalid data provided"

    def test_register_missing_data(self):
        with self.app as client:
            user_data = {
                "username": "testuser",
                "password": "testpassword"
            }
            response = client.post('/api/register', json=user_data)
            assert response.status_code == 400
            assert response.json['message'] == "Missing required data"

    def test_get_all_events(self):
        with self.app as client:
            response = client.get('/api/events')
            assert response.status_code == 200
            assert isinstance(response.json, list)

    def test_create_event(self):
        with self.app as client:
            event_data = {
                "organizer_id": 1,
                "event_name": "Test Event",
                "event_description": "This is a test event",
                "start_date": "2022-01-01",
                "end_date": "2022-01-02",
                "location": "Test Location",
                "category": "Test Category",
                "total_tickets_available": 100,
                "early_booking_price": 50,
                "mvp_price": 75,
                "regular_price": 100
            }
            response = client.post('/api/events', json=event_data)
            assert response.status_code == 201
            assert response.json['message'] == "Event created successfully!"
            assert Event.query.filter_by(event_name="Test Event").first() is not None

    def test_create_duplicate_event(self):
        with self.app as client:
            event_data = {
                "organizer_id": 1,
                "event_name": "Test Event",
                "event_description": "This is a test event",
                "start_date": "2022-01-01",
                "end_date": "2022-01-02",
                "location": "Test Location",
                "category": "Test Category",
                "total_tickets_available": 100,
                "early_booking_price": 50,
                "mvp_price": 75,
                "regular_price": 100
            }
            response = client.post('/api/events', json=event_data)
            assert response.status_code == 409
            assert response.json['message'] == "Event already exists"

    def test_create_event_invalid_data(self):
        with self.app as client:
            event_data = {
                "organizer_id": 1,
                "event_name": "Test Event",
                "event_description": "This is a test event",
                "start_date": "2022-01-01",
                "end_date": "2022-01-02",
                "location": "Test Location",
                "category": "Test Category",
                "total_tickets_available": "invalid",
                "early_booking_price": 50,
                "mvp_price": 75,
                "regular_price": 100
            }
            response = client.post('/api/events', json=event_data)
            assert response.status_code == 400
            assert response.json['message'] == "Invalid data provided"

    def test_create_event_missing_data(self):
        with self.app as client:
            event_data = {
                "organizer_id": 1,
                "event_name": "Test Event",
                "event_description": "This is a test event",
                "start_date": "2022-01-01",
                "end_date": "2022-01-02",
                "location": "Test Location",
                "category": "Test Category",
                "early_booking_price": 50,
                "mvp_price": 75,
                "regular_price": 100
            }
            response = client.post('/api/events', json=event_data)
            assert response.status_code == 400
            assert response.json['message'] == "Missing required data"

    def test_get_all_users(self):
        with self.app as client:
            response = client.get('/api/users')
            assert response.status_code == 200
            assert isinstance(response.json, list)

    def test_get_user(self):
        with self.app as client:
            response = client.get('/api/users/1')
            assert response.status_code == 200
            assert isinstance(response.json, dict)

    # def test_get_user_not_found(self):
    #     with self.app as client:
    #         response = client.get('/api/users/999')
    #         assert response.status_code == 404
    #         assert response.json['message'] == "User Not Found"

    # Add test methods for other routes (e.g., tickets, calendar, etc.)

if __name__ == '__main__':
    unittest.main()

