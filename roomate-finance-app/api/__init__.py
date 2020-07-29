from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    from .api_code.Config import DBConfigs
    config = DBConfigs()

    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqldb://'+ config.user + ':' + config.password + '@' + config.host + ':' +config.port +'/'+ config.dbName

    db.init_app(app)

    from .api_code.views import main
    app.register_blueprint(main)

    return app