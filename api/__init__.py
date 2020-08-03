import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__,static_folder='../build', static_url_path='/')

    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    # app.config['SECRET_KEY'] = os.environ.get('DATABASE_URL')

    db.init_app(app)

    with app.app_context():
        db.create_all()

    from .views import main
    app.register_blueprint(main)

    return app