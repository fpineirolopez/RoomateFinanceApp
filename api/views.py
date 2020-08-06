# Script used to work as API backend. Maps routes to specific API functions 
# defined in this file, which use obeject from Models.py to query and manipulate
# data from our postgres DB. Also routes backend to React front end

from flask import Blueprint, jsonify, request
from . import db
from .models import Expense, Payment
import simplejson as json
from decimal import Decimal

# point to React front-end build folder to access files
main = Blueprint('main',__name__, static_folder='../build', static_url_path='/')


########################### LOAD REACT ##############################

# point home directory to react front-end (must run npm run build to generate static files)
@main.route('/')
def index():
    return main.send_static_file('index.html')

#####################################################################


########################### GET REQUESTS  ###########################

#  get all expenses -- NOT CURRENTLY USED
@main.route('/api/v1/expenses/all', methods=['GET'])
def get_all_expenses():
    
    # get all expenses from the database
    expense_list = Expense.query.all()
    expenses = []

    # generate dictionary array of expenses with values from the query above
    for expense in expense_list:
        expenses.append({'category': expense.category, 'amount': Decimal(expense.amount), 'duedate': expense.duedate, 'month': expense.month, 'status': expense.status, 'id': expense.expenseid})

    # return json array of expenses
    return jsonify(expenses)

# get eall months where we have expenses in 
# IN V1 WE USE THE EXPENSE MONTHS FOR DROPDOWN. 
# FUTURE RELEASES WILL ALLOW FOR USERS ON CLIENT SIDE TO ENTER PAYMENTS AND MONTHLY
@main.route('/api/v1/expenses/months', methods=['GET'])
def get_expenses_months():

    months = []

    # store each distinct month on the month array
    for m in Expense.query.distinct(Expense.month):
        months.append({'month': m.month})
 
    # return json array of expense months
    return jsonify(months)

# get expense information for a specific month
@main.route('/api/v1/expenses', methods=['GET'])
def get_expenses_filtered():

    # get month argument from api url
    month = request.args.get('month')

    # query expenses table to get payments with matching month
    expense_list = Expense.query.filter(Expense.month == month.capitalize()).all()
    expenses = []

    # generate dictionary array of expenses with values from the query above
    for expense in expense_list:
        expenses.append({'category': expense.category, 'amount': Decimal(expense.amount), 'duedate': expense.duedate, 'month': expense.month, 'status': expense.status, 'id': expense.expenseid})

    # return json array of expenses
    return jsonify(expenses)


# get all payments -- NOT CURRENTLY USED
@main.route('/api/v1/payments/all', methods=['GET'])
def get_all_payments():

    # get all payments from the database
    payment_list = Payment.query.all()
    payments = []

    # generate dictionary array of payments with values from the query above
    for payment in payment_list:
        payments.append({'roommatename': payment.roommatename,'category': payment.category, 'amount': Decimal(payment.amount), 'paymentdate': payment.paymentdate, 'month': payment.month, 'status': payment.status, 'id': payment.paymentid})

    # return json array of payments
    return jsonify(payments)


# get payment information for a specific month
@main.route('/api/v1/payments', methods=['GET'])
def get_payments_filtered():
    
    # get month argument from api url
    month = request.args.get('month')

    # query payments table to get payments with matching month
    payment_list = Payment.query.filter(Payment.month == month.capitalize()).all()
    payments = []

    # generate dictionary array of payments with values from the query above
    for payment in payment_list:
        payments.append({'roommatename': payment.roommatename,'category': payment.category,'amount': Decimal(payment.amount), 'paymentdate': payment.paymentdate, 'month': payment.month, 'status': payment.status, 'id': payment.paymentid})

    # return json array of payments
    return jsonify(payments)

#####################################################################

##########################  POST REQUESTS  ##########################

# call to insert payment
@main.route('/api/v1/payments/insert_payment', methods=['POST'])
def insert_payment():
    
    # get params from request
    payment_data = request.get_json()

    # creat table row object
    new_payment = Payment(  roommatename    = payment_data['roommatename'], 
                            category        = payment_data['category'],
                            amount          = Decimal(payment_data['amount']),
                            paymentdate     = payment_data['paymentdate'],
                            month           = payment_data['month'],
                            status          = payment_data['status'],
                            year            = payment_data['year'])

    # insert and commit
    db.session.add(new_payment)
    db.session.commit()

    return 'Done', 201

# call to insert expense
@main.route('/api/v1/payments/insert_expense', methods=['POST'])
def insert_expense():
    
    # get params from request
    expense_data = request.get_json()

    # creat table row object
    new_expense = Expense(  category        = payment_data['category'],
                            amount          = Decimal(payment_data['amount']),
                            duedate         = duedate['paymentdate'],
                            month           = payment_data['month'],
                            status          = payment_data['status'],
                            year            = payment_data['year'])

    # insert and commit
    db.session.add(new_expense)
    db.session.commit()

    return 'Done', 201

#####################################################################