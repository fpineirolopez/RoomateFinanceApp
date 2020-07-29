from flask import Blueprint, jsonify, request
from . import db
from .models import Expense, Payment

main = Blueprint('main',__name__)

@main.route('/api/v1/expenses/all', methods=['GET'])
def get_all_expenses():
    
    expense_list = Expense.query.all()
    expenses = []

    for expense in expense_list:
        expenses.append({'Category': expense.category, 'Amount': expense.amount, 'Due_Date': expense.due_date, 'Month': expense.month, 'Status': expense.status})

    return jsonify(expenses)

@main.route('/api/v1/expenses/months', methods=['GET'])
def get_expenses_months():

    months = []

    for m in Expense.query.distinct(Expense.month):
        months.append(('month', m.month))

    disitnct_months = list(set([i for i in months]))

    return jsonify(disitnct_months)

@main.route('/api/v1/expenses', methods=['GET'])
def get_expenses_filtered():

    month = request.args.get('month')

    expense_list = Expense.query.filter(Expense.month == month).all()
    expenses = []

    for expense in expense_list:
        expenses.append({'Category': expense.category, 'Amount': expense.amount, 'Due_Date': expense.due_date, 'Month': expense.month, 'Status': expense.status})

    return jsonify(expenses)


@main.route('/api/v1/payments/all', methods=['GET'])
def get_all_payments():

    payment_list = Payment.query.all()
    payments = []

    for payment in payment_list:
        payments.append({'Roommate_Name': payment.roommate_name,'Category': payment.category, 'Amount': payment.amount, 'Payment_Date': payment.payment_date, 'Month': payment.month, 'Status': payment.status})

    return jsonify(payments)

@main.route('/api/v1/payments', methods=['GET'])
def get_payments_filtered():
    
    month = request.args.get('month')

    payment_list = Payment.query.filter(Payment.month == month).all()
    payments = []

    for payment in payment_list:
        payments.append({'Roommate_Name': payment.roommate_name,'Category': payment.category, 'Amount': payment.amount, 'Payment_Date': payment.payment_date, 'Month': payment.month, 'Status': payment.status})

    return jsonify(payments)

