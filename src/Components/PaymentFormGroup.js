// react-bootstrap form component that takes in user inputs
// and generates json object to pass in post request to insert/edit
// payment data

import React from 'react'
import { Form } from 'react-bootstrap'


function PaymentFormGroup(props){
    
    return (
        <div>
            {/* Roommate Name text field = name of roommate making payment */}
            <Form.Group controlId="formPaymentName">
                <Form.Label>Roommate Name</Form.Label>
                <Form.Control 
                    type="name" 
                    placeholder="i.e. Felipe" 
                    value={props.roommatename}
                    onChange={e => props.setName(e.target.value)}/>
            </Form.Group>
            {/* Category text field = category of payment made */}
            <Form.Group controlId="formPaymentMonth">
                <Form.Label>Payment Month</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="i.e. June" 
                    value={props.month}
                    onChange={e => props.setMonth(e.target.value)}/>
            </Form.Group>            
            {/* year text field = year of payment made */}
            <Form.Group controlId="formPaymentYear">
                <Form.Label>Payment Year</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="i.e. 2020" 
                    value={props.year}
                    onChange={e => props.setYear(e.target.value)}/>
            </Form.Group>
            {/* Category text field = category of payment made */}
            <Form.Group controlId="formPaymentCategory">
                <Form.Label>Payment Category</Form.Label>
                <Form.Control 
                    type="category" 
                    placeholder="i.e. Rent" 
                    value={props.category}
                    onChange={e => props.setCategory(e.target.value)}/>
            </Form.Group>
            {/* Amount text field = payment amount */}
            <Form.Group controlId="formPaymentAmount">
                <Form.Label>Amount Paid</Form.Label>
                <Form.Control 
                    type="amount" 
                    placeholder="i.e. 500 (No $ required)" 
                    value={props.amount}
                    onChange={e => props.setAmount(e.target.value)}/>
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
                    value={props.paymentdate}
                    onChange={e => props.setDate(e.target.value)}/>
            </Form.Group>
            {/* Payment status checkboxes = select between PAID/UNPAID 
                Doesn't make much sense now but could be used later on to request payments
                or to remind person to pay a specific bill
            */}
            <Form.Group controlId="formPaymentStatus">
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

export default PaymentFormGroup