// react-bootstrap form component that takes in user inputs
// and generates json object to pass in post request to insert
// Expense data

import React from 'react'
import { Form,  Button } from 'react-bootstrap'


function ExpenseForm(props){

    // state components and functions for user input
    const [month, setMonth] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [amount, setAmount] = React.useState(0);
    const [duedate, setDate] = React.useState("");
    
    // status is hardcoded to unpaid on insert
    const status = "Unpaid";

    return (
        <Form>
            {/* Category text field = category of Expense made */}
            <Form.Group controlId="formExpenseMonth">
                <Form.Label>Expense Month</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="i.e. June" 
                    value={month}
                    onChange={e => setMonth(e.target.value)}/>
            </Form.Group>
            {/* Category text field = category of Expense made */}
            <Form.Group controlId="formExpenseCategory">
                <Form.Label>Expense Category</Form.Label>
                <Form.Control 
                    type="category" 
                    placeholder="i.e. Rent" 
                    value={category}
                    onChange={e => setCategory(e.target.value)}/>
            </Form.Group>
            {/* Amount text field = expense amount */}
            <Form.Group controlId="formExpenseAmount">
                <Form.Label>Amount Due</Form.Label>
                <Form.Control 
                    type="amount" 
                    placeholder="i.e. 500 (No $ required)" 
                    value={amount}
                    onChange={e => setAmount(e.target.value)}/>
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
                    value={duedate}
                    onChange={e => setDate(e.target.value)}/>
            </Form.Group>

            {/* submit button */}
            <Button variant="success" 
            // on click method calls async post request by generatin json object 
            // usen state components filled with user inputted data
            onClick={ async () => {
                //for now year is hardcoded
                const year = 2020
                //Expense data object to be inserted
                const expense = {category, amount, duedate, month, status, year}
                // post request response, used to evaluate if response was successfull
                const response = await fetch("api/v1/expenses/insert_expense", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(expense)
                })

                // if response was successful, call onNewExpense function passed as a prop to update 
                // Expense data on parent components and accross the site, and reset state constants
                if (response.ok){
                    // props.onNewExpense(expense);
                    props.onNewExpense(month);
                    setCategory("");
                    setAmount(0);
                    setDate("");
                }
            }}>
                Submit
            </Button>
        </Form>
    );
}

export default ExpenseForm