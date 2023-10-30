from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import db
from model.event import Event
from model.eventcalendar import EventCalendar
from model.role import Role
from model.user import User
from model.ticket import Ticket




app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

migrate = Migrate(app, db)




if __name__ == '__main__':
    app.run(debug=True)

