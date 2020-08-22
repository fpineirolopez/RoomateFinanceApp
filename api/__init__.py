# init python file that has create_app function and generated db
# SQLAlchemy object to connect to the Postgres DB

import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    # point to React front-end build folder to access files
    app = Flask(__name__,static_folder='../build', static_url_path='/')

    # DB configuration entries
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    # app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

    # init app call
    db.init_app(app)

    # register blueprint, connects to views script
    from .views import main
    app.register_blueprint(main)

    return app