// react-bootstrap form component that takes in user inputs
// and generates json object to pass in post request to update
// Payment/Expense data

import React from 'react'
import { Form,  Button } from 'react-bootstrap'
import PaymentFormGroup from './PaymentFormGroup'
import ExpenseFormGroup from './ExpenseFormGroup'


function EditForm(props){

    // state components and functions for user input
    const [roommatename, setName] = React.useState(props.type === "P"?  props.data.roommatename : "");
    const [month, setMonth] = React.useState(props.data.month);
    const [year, setYear] = React.useState(props.data.year);
    const [category, setCategory] = React.useState(props.data.category);
    const [amount, setAmount] = React.useState(props.data.amount);
    const [date, setDate] = React.useState(dateFlip(props.date)); 
    const [status, setStatus] = React.useState(props.data.status);

    // display correct form group based on type of data
    let formGroup 
    if (props.type === "P"){
        formGroup = <PaymentFormGroup 
                        data={props.data}
                        source={"Edit"}
                        roommatename={roommatename}
                        setName={setName}
                        month={month}
                        setMonth={setMonth}               
                        year={year}
                        setYear={setYear}
                        category={category}
                        setCategory={setCategory}
                        amount={amount}
                        setAmount={setAmount}
                        paymentdate={date}
                        setDate={setDate}
                        status={status}
                        setStatus={setStatus}
                    />
    }
    else {
        formGroup = <ExpenseFormGroup 
                        data={props.data}
                        source={"Edit"}
                        month={month}
                        setMonth={setMonth}           
                        year={year}
                        setYear={setYear}
                        category={category}
                        setCategory={setCategory}
                        amount={amount}
                        setAmount={setAmount}
                        duedate={date}
                        setDate={setDate}
                        status={status}
                        setStatus={setStatus}
                    />
    }

    return (
        <Form>
            {/* Display fprm group */}
            {formGroup}

            {/* submit button */}
            <Button variant="success" 
            // on click method calls async post request by generatin json object 
            // usen state components filled with user inputted data
            onClick={ async () => {

                //select correct endpoint and data format
                let endpoint, content

                if (props.type === "P"){
                    endpoint = "/api/v1/payments/update_payment/" + props.data.id
                    const paymentdate = date
                    content = {roommatename, category, amount, paymentdate, month, status, year}
                }
                else {
                    endpoint = "/api/v1/expenses/update_expense/" + props.data.id
                    const duedate = date
                    content = {category, amount, duedate, month, status, year}
                }

                // post request response, used to evaluate if response was successfull
                const response = await fetch(endpoint, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(content)
                })

                // if response was successful, call onNewExpense function passed as a prop to update 
                // Expense data on parent components and accross the site, and reset state constants
                if (response.ok){
                    // props.onNewExpense(expense);
                    props.onEdit(month, year);
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

export default EditForm

// function to grab correct length date and display in mm-dd-yyyy format
function dateFlip(date) {
    
    var parts = date.split("-");
    const year = parts[2];
    const day =  parts[1];
    const month = parts[0];

    return (year + '-' + month + '-' + day);
}