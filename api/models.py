# Python script with classes for the two tables used in our Postgres DB

from . import db

# Expense class object, used to query and insert data in expenses table
class Expense(db.Model):
    __tablename__   = 'expenses'
    expenseid       = db.Column('expenseid',db.Integer,primary_key=True)
    category        = db.Column('category',db.String(50))
    amount          = db.Column('amount',db.Numeric(8,2))
    duedate        = db.Column('duedate',db.Date)
    status          = db.Column('status',db.String(50))
    month           = db.Column('month',db.String(50))
    year            = db.Column('year',db.Integer)

# Paymenty class object, used to query and insert data in payments table
class Payment(db.Model):
    __tablename__   = 'payments'
    paymentid       = db.Column('paymentid',db.Integer,primary_key=True)
    roommatename    = db.Column('roommatename',db.String(50))
    category        = db.Column('category',db.String(50))
    amount          = db.Column('amount',db.Numeric(8,2))
    paymentdate    = db.Column('paymentdate',db.Date)
    status          = db.Column('status',db.String(50))
    month           = db.Column('month',db.String(50))
    year            = db.Column('year',db.Integer)
