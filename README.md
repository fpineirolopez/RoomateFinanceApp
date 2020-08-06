## Roomate Finance WebApp 

Roomate Finance WebApp to manage common expenses and track individual payments.

Application consists of a React JS front-end, with a Flask/Python back-end and a PostgreSQL DB

WebApp deployed using Heroku

## React JS

This project's frontend was bootstrapped with Create React App, and makes use of react-bootstrap library for styling and stylized components

To run locally, use npm start or yarn start

To deploy front-end, use npm run build. Flask back-end will use files from build folder to access and display frontend.

## Flask/Python

Python backend using Flask. 3 main files:
    __init__.py --> init file with create_app() function. Initializes db object and maps to blueprint object in views.py
    views.py    --> file with all api routes and corresponding queries, inserts, updates to PostgreSQL DB
    models.py   --> contains Expense and Payment object classes used to model DB objects and calls

Flask backend makes use of the following libraries:
    flask
    gunicorn            --> for heroku deployment
    sqlalchemy          --> for DB modeling and access
    flask-sqlalchemy    --> for DB modeling and access
    simplejson          --> for Decimal json parsing
    psycopg2            --> for PostgreSQL access

Installed locally using pipenv --> pip install pipenv
Other libraries installed with command --> pipenv install <library-name>

To deploy:
    Lock Pipfile --> pipenv lock
    Install the last successful environment in lock file --> pipenv install --ignore-pipfile

## PostgreSQL DB

Simple DB with 2 tables:
    DB Name: roommate-finances
    Tables:
        expenses
        payments

The expenses table records expenses for each month, including information like:
    amount due
    category
    due date

The payments table records payments for each month, including information like:
    roommate name
    category
    amount paid
    payment date

The DB objects are modeled in the flask backend using SQLAlchemy. The models are in the models.py file

## Heroku Deployment

Deployed to Heroku with Personal/Hobby license
Files used for deployment:
    wsigi.py    --> calls create_app() function from __inti__.py file
    Procfile    --> used for heroku, references app object in wsgi.py file
    runtime.txt --> specifies Python runtime (python-3.8.5)

To deploy run following commands from master branch:
    git add .                           --> add any local changes (if any)
    git commit -m "message"             --> commit local changes (if any)
    git push or git push heroku master  --> push changes. Git push will automatically trigger heroku build. Adding heroku master will display heroky build log on console