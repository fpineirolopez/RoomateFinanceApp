// react-bootstrap form component that takes in user inputs
// and generates json object to pass in post request to insert/edit
// Expense data

import React from 'react'
import { Form } from 'react-bootstrap'


function ExpenseFormGroup(props){

    return (
        <div>
            {/* Month text field = month of Expense made */}
            <Form.Group controlId="formExpenseMonth">
                <Form.Label>Expense Month</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="i.e. June" 
                    value={props.month}
                    onChange={e => props.setMonth(e.target.value)}/>
            </Form.Group>
            {/* year text field = year of Expense made */}
            <Form.Group controlId="formExpenseYear">
                <Form.Label>Expense Year</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="i.e. 2020" 
                    value={props.year}
                    onChange={e => props.setYear(e.target.value)}/>
            </Form.Group>
            {/* Category text field = category of Expense made */}
            <Form.Group controlId="formExpenseCategory">
                <Form.Label>Expense Category</Form.Label>
                <Form.Control 
                    type="category" 
                    placeholder="i.e. Rent" 
                    value={props.category}
                    onChange={e => props.setCategory(e.target.value)}/>
            </Form.Group>
            {/* Amount text field = expense amount */}
            <Form.Group controlId="formExpenseAmount">
                <Form.Label>Amount Due</Form.Label>
                <Form.Control 
                    type="amount" 
                    placeholder="i.e. 500 (No $ required)" 
                    value={props.amount}
                    onChange={e => props.setAmount(e.target.value)}/>
            </Form.Group>
            {/* Expense date field = date of Expense made 
                Data can be inserted manually in the format mm/dd/yyyy or
                using the automatically added bootstrap calendar widget
            */}
            <Form.Group controlId="formExpenseDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control 
                    type="date" 
                    placeholder="i.e. 07/19/2020" 
                    value={props.duedate}
                    onChange={e => props.setDate(e.target.value)}/>
            </Form.Group>
            {/* Expense status checkboxes = select between PAID/UNPAID 
                Doesn't make much sense now but could be used later on to request payments
                or to remind person to pay a specific bill
            */}
            <Form.Group controlId="formExpenseStatus">
                <Form.Check inline 
                    label="Paid" 
                    type="radio"
                    value={"Paid"}
                    checked={props.status === "Paid"}
                    onChange={e => props.setStatus(e.target.value)}/>
                <Form.Check inline 
                    label="Unpaid" 
                    type="radio"
                    value={"Unpaid"}
                    checked={props.status === "Unpaid"}
                    onChange={e => props.setStatus(e.target.value)}/>
            </Form.Group>
        </div>
    );
}

export default ExpenseFormGroup