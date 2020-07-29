from flask import Blueprint, jsonify, request
from .. import db
from .models import Expense, Payment

main = Blueprint('main',__name__)

@main.route('/api/v1/expenses/all', methods=['GET'])
def get_all_expenses():
    
    expense_list = Expense.query.all()
    expenses = []

    for expense in expense_list:
        expenses.append({'category': expense.category, 'amount': expense.amount, 'due_date': expense.due_date, 'month': expense.month, 'status': expense.status})

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

    expense_list = Expense.query.filter(Expense.month == month).all()
    expenses = []

    for expense in expense_list:
        expenses.append({'category': expense.category, 'amount': expense.amount, 'due_date': expense.due_date, 'month': expense.month, 'status': expense.status})

    return jsonify(expenses)


@main.route('/api/v1/payments/all', methods=['GET'])
def get_all_payments():

    payment_list = Payment.query.all()
    payments = []

    for payment in payment_list:
        payments.append({'roommate_name': payment.roommate_name,'category': payment.category, 'amount': payment.amount, 'payment_date': payment.payment_date, 'month': payment.month, 'status': payment.status})

    return jsonify(payments)

@main.route('/api/v1/payments', methods=['GET'])
def get_payments_filtered():
    
    month = request.args.get('month')

    payment_list = Payment.query.filter(Payment.month == month).all()
    payments = []

    for payment in payment_list:
        payments.append({'roommate_name': payment.roommate_name,'category': payment.category, 'amount': payment.amount, 'payment_date': payment.payment_date, 'month': payment.month, 'status': payment.status})

    return jsonify(payments)

