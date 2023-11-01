import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from flask_wtf.csrf import CSRFProtect

#load environment variables
load_dotenv()

class Config():
    #DATABASE CONFIG
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

app = Flask(__name__)
app.config.from_object(Config)

#initailize databases and migrations
db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

#enable CORS
CORS(app)

#enable CSRF protection
csrf = CSRFProtect(app)


