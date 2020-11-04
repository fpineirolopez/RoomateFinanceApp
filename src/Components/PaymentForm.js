// react-bootstrap form component that takes in user inputs
// and generates json object to pass in post request to insert
// payment data

import React from 'react'
import { Form,  Button } from 'react-bootstrap'
import PaymentFormGroup from './PaymentFormGroup'


function PaymentForm(props){

    // state components and functions for user input
    const [roommatename, setName] = React.useState("");
    const [month, setMonth] = React.useState("");
    const [year, setYear] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [amount, setAmount] = React.useState(0);
    const [paymentdate, setDate] = React.useState("");
    const [status, setStatus] = React.useState("");
    
    // state element for display month state
    // const [month] = React.useState(props.month.month);
    
    return (
        <Form>
            {/* Form Body for payment data */}
            <PaymentFormGroup 
                source={"Insert"}
                roommatename={roommatename}
                setName={setName}
                month={month}            
                year={year}
                setYear={setYear}
                setMonth={setMonth}
                category={category}
                setCategory={setCategory}
                amount={amount}
                setAmount={setAmount}
                paymentdate={paymentdate}
                setDate={setDate}
                status={status}
                setStatus={setStatus}
            />

            {/* submit button */}
            <Button variant="success" 
            // on click method calls async post request by generatin json object 
            // usen state components filled with user inputted data
            onClick={ async () => {
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
                    props.onNewPayment(month, year);
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