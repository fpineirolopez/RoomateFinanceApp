from . import db

class Expense(db.Model):
    __tablename__   = 'expenses'
    expenseid       = db.Column('expenseid',db.Integer,primary_key=True)
    category        = db.Column('category',db.String(50))
    amount          = db.Column('amount',db.Float)
    duedate         = db.Column('duedate',db.Date)
    status          = db.Column('status',db.String(50))
    month           = db.Column('month',db.String(50))
    year            = db.Column('year',db.Integer)


class Payment(db.Model):
    __tablename__   = 'payments'
    paymentid       = db.Column('paymentid',db.Integer,primary_key=True)
    roommatename    = db.Column('roommatename',db.String(50))
    category        = db.Column('category',db.String(50))
    amount          = db.Column('amount',db.Float)
    paymentdate     = db.Column('paymentdate',db.Date)
    status          = db.Column('status',db.String(50))
    month           = db.Column('month',db.String(50),primary_key=True)
    year            = db.Column('year',db.Integer)
