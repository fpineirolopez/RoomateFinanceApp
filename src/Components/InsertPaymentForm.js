// react-bootstrap form component that takes in user inputs
// and generates json object to pass in post request to insert
// payment data

import React from 'react'
import { Form,  Button } from 'react-bootstrap'


function PaymentForm(props){

    // state components and functions for user input
    const [roommatename, setName] = React.useState("");
    const [month, setMonth] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [amount, setAmount] = React.useState(0);
    const [paymentdate, setDate] = React.useState("");
    const [status, setStatus] = React.useState("");
    
    // state element for display month state
    // const [month] = React.useState(props.month.month);
    
    return (
        <Form>
            {/* Roommate Name text field = name of roommate making payment */}
            <Form.Group controlId="formPaymentName">
                <Form.Label>Roommate Name</Form.Label>
                <Form.Control 
                    type="name" 
                    placeholder="i.e. Felipe" 
                    value={roommatename}
                    onChange={e => setName(e.target.value)}/>
            </Form.Group>
            {/* Category text field = category of Expense made */}
            <Form.Group controlId="formPaymentMonth">
                <Form.Label>Expense Month</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="i.e. June" 
                    value={month}
                    onChange={e => setMonth(e.target.value)}/>
            </Form.Group>
            {/* Category text field = category of payment made */}
            <Form.Group controlId="formPaymentCategory">
                <Form.Label>Payment Category</Form.Label>
                <Form.Control 
                    type="category" 
                    placeholder="i.e. Rent" 
                    value={category}
                    onChange={e => setCategory(e.target.value)}/>
            </Form.Group>
            {/* Amount text field = payment amount */}
            <Form.Group controlId="formPaymentAmount">
                <Form.Label>Amount Paid</Form.Label>
                <Form.Control 
                    type="amount" 
                    placeholder="i.e. 500 (No $ required)" 
                    value={amount}
                    onChange={e => setAmount(e.target.value)}/>
            </Form.Group>
            {/* Payment date field = date of payment made 
                Data can be inserted manually in the format mm/dd/yyyy or
                using the automatically added bootstrap calendar widget
            */}
            <Form.Group controlId="formPaymentDate">
                <Form.Label>Payment Date</Form.Label>
                <Form.Control 
                    type="date" 
                    placeholder="i.e. 07/19/2020" 
                    value={paymentdate}
                    onChange={e => setDate(e.target.value)}/>
            </Form.Group>
            {/* Payment status checkboxes = select between PAID/UNPAID 
                Doesn't make much sense now but could be used later on to request payments
                or to remind person to pay a specific bill
            */}
            <Form.Group controlId="formPaymentStatus">
                <Form.Check inline 
                    label="Paid" 
                    type="checkbox"
                    value={"Paid"}
                    onChange={e => setStatus(e.target.value)}/>
                <Form.Check inline 
                    label="Unpaid" 
                    type="checkbox"
                    value={"Unpaid"}
                    onChange={e => setStatus(e.target.value)}/>
            </Form.Group>

            {/* submit button */}
            <Button variant="success" 
            // on click method calls async post request by generatin json object 
            // usen state components filled with user inputted data
            onClick={ async () => {
                //for now year is hardcoded
                const year = 2020
                //payment data object to be inserted
                const payment = {roommatename, category, amount, paymentdate, month, status, year}
                // post request response, used to evaluate if response was successfull
                const response = await fetch("api/v1/payments/insert_payment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payment)
                })

                // if response was successful, call onNewPayment function passed as a prop to update 
                // payment data on parent components and accross the site, and reset state constants
                if (response.ok){
                    props.onNewPayment(month);
                    setName("");
                    setCategory("");
                    setAmount(0);
                    setDate("");
                    setStatus("");
                }
            }}>
                Submit
            </Button>
        </Form>
    );
}

export default PaymentForm