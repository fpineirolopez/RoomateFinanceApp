from flask import Blueprint, jsonify, request
from . import db
from .models import Expense, Payment

main = Blueprint('main',__name__, static_folder='../build', static_url_path='/')


####################### LOAD REACT cd api #######################
@main.route('/')
def index():
    return main.send_static_file('index.html')


####################### GET REQUESTS  #######################
@main.route('/api/v1/expenses/all', methods=['GET'])
def get_all_expenses():
    
    expense_list = Expense.query.all()
    expenses = []

    for expense in expense_list:
        expenses.append({'category': expense.category, 'amount': expense.amount, 'duedate': expense.duedate, 'month': expense.month, 'status': expense.status, 'id': expense.expenseid})

    return jsonify(expenses)

@main.route('/api/v1/expenses/months', methods=['GET'])
def get_expenses_months():

    months = []

    for m in Expense.query.distinct(Expense.month):
        months.append({'month': m.month})

    return jsonify(months)

@main.route('/api/v1/expenses', methods=['GET'])
def get_expenses_filtered():

    month = request.args.get('month')

    expense_list = Expense.query.filter(Expense.month == month.capitalize()).all()
    expenses = []

    for expense in expense_list:
        expenses.append({'category': expense.category, 'amount': expense.amount, 'duedate': expense.duedate, 'month': expense.month, 'status': expense.status, 'id': expense.expenseid})

    return jsonify(expenses)


@main.route('/api/v1/payments/all', methods=['GET'])
def get_all_payments():

    payment_list = Payment.query.all()
    payments = []

    for payment in payment_list:
        payments.append({'roommatename': payment.roommatename,'category': payment.category, 'amount': payment.amount, 'paymentdate': payment.paymentdate, 'month': payment.month, 'status': payment.status, 'id': payment.paymentid})

    return jsonify(payments)

@main.route('/api/v1/payments', methods=['GET'])
def get_payments_filtered():
    
    month = request.args.get('month')

    payment_list = Payment.query.filter(Payment.month == month.capitalize()).all()
    payments = []

    for payment in payment_list:
        payments.append({'roommatename': payment.roommatename,'category': payment.category, 'amount': payment.amount, 'paymentdate': payment.paymentdate, 'month': payment.month, 'status': payment.status, 'id': payment.paymentid})

    return jsonify(payments)

 ####################### POST REQUESTS  #######################
@main.route('/api/v1/payments/insert_payment', methods=['POST'])
def insert_payment():
    
    payment_data = request.get_json()

    new_payment = Payment(  roommatename    = payment_data['roommatename'], 
                            category        = payment_data['category'],
                            amount          = payment_data['amount'],
                            paymentdate     = payment_data['paymentdate'],
                            month           = payment_data['month'],
                            status          = payment_data['status'],
                            year            = payment_data['year'])

    db.session.add(new_payment)
    db.session.commit()

    return 'Done', 201
