from .. import db

class Expense(db.Model):
    __tablename__   = 'expenses'
    category        = db.Column('category',db.String(50),primary_key=True)
    amount          = db.Column('amount',db.Float)
    due_date        = db.Column('due_date',db.Date)
    status          = db.Column('status',db.String(50))
    month           = db.Column('month',db.String(50),primary_key=True)
    year            = db.Column('year',db.Integer)


class Payment(db.Model):
    __tablename__   = 'payments'
    roommate_id     = db.Column('roommate_id',db.String(50),primary_key=True)
    category        = db.Column('category',db.String(50),primary_key=True)
    amount          = db.Column('amount',db.Float)
    payment_date    = db.Column('payment_date',db.Date)
    status          = db.Column('status',db.String(50))
    month           = db.Column('month',db.String(50),primary_key=True)
    year            = db.Column('year',db.Integer)
    roommate_name   = db.Column('roommate_name')
