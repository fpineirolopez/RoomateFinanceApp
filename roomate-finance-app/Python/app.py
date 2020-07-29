from Config import DBConfigs
from flask import Flask, jsonify, request
from flask_mysqldb import MySQL

app = Flask(__name__)

config = DBConfigs()

app.config['MYSQL_HOST'] = config.host
app.config['MYSQL_PORT'] = config.port
app.config['MYSQL_USER'] = config.user
app.config['MYSQL_PASSWORD'] = config.password
app.config['MYSQL_DB'] = config.dbName

mysql = MySQL(app)


@app.route('/api/v1/expenses/all', methods=['GET'])
def get_expenses():
    query = 'select * from expenses'

    cur = mysql.connection.cursor()
    cur.execute(query)

    response = cur.fetchall()
    
    items = [dict(zip([key[0] for key in cur.description], row)) for row in response]

    return jsonify(items)

@app.route('/api/v1/expenses/months', methods=['GET'])
def get_expenses_months():
    query = 'select distinct month from expenses'

    cur = mysql.connection.cursor()
    cur.execute(query)

    response = cur.fetchall()
    
    items = [dict(zip([key[0] for key in cur.description], row)) for row in response]

    return jsonify(items)

@app.route('/api/v1/payments/all', methods=['GET'])
def get_payments():
    query = 'select * from payments'

    cur = mysql.connection.cursor()
    cur.execute(query)

    response = cur.fetchall()

    items = [dict(zip([key[0] for key in cur.description], row)) for row in response]

    return jsonify(items)

@app.route('/api/v1/expenses', methods=['GET'])
def get_expenses_filtered():
    
    month = request.args.get('month')

    query = "select * from expenses where"

    if month:
        query += " month='"+month+"'"
    if not (month):
        return page_not_found(404)

    cur = mysql.connection.cursor()
    
    try:
        cur.execute(query)
    except:
        print("An exception occurred")

    response = cur.fetchall()

    items = [dict(zip([key[0] for key in cur.description], row)) for row in response]

    return jsonify(items)

@app.route('/api/v1/payments', methods=['GET'])
def get_payments_filtered():
    
    month = request.args.get('month')

    query = "select * from payments where"

    if month:
        query += " month='"+month+"'"
    if not (month):
        return page_not_found(404)

    cur = mysql.connection.cursor()
    
    try:
        cur.execute(query)
    except:
        print("An exception occurred")

    response = cur.fetchall()

    items = [dict(zip([key[0] for key in cur.description], row)) for row in response]

    return jsonify(items)


@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404

if __name__ == '__main__':
    app.run()
