// react-bootstrap form component that takes in user inputs
// and generates json object to pass in post request to insert
// Expense data

import React from 'react'
import { Form,  Button } from 'react-bootstrap'
import ExpenseFormGroup from './ExpenseFormGroup'


function ExpenseForm(props){

    // state components and functions for user input
    const [month, setMonth] = React.useState("");
    const [year, setYear] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [amount, setAmount] = React.useState(0);
    const [duedate, setDate] = React.useState("");
    const [status, setStatus] = React.useState("");

    return (
        <Form>
            {/* Form Body for payment data */}
            <ExpenseFormGroup 
                source={"Insert"}
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
                category={category}
                setCategory={setCategory}
                amount={amount}
                setAmount={setAmount}
                duedate={duedate}
                setDate={setDate}
                status={status}
                setStatus={setStatus}
            />
            
            {/* submit button */}
            <Button variant="success" 
            // on click method calls async post request by generatin json object 
            // usen state components filled with user inputted data
            onClick={ async () => {
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
                    props.onNewExpense(month, year);
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