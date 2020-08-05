import React from 'react'
import { Form,  Button } from 'react-bootstrap'


function PaymentForm(props){

    const [roommatename, setName] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [amount, setAmount] = React.useState(0);
    const [paymentdate, setDate] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [month] = React.useState(props.month.month);
    
    return (
        <Form>
            <Form.Group controlId="formPaymentName">
                <Form.Label>Roommate Name</Form.Label>
                <Form.Control 
                    type="name" 
                    placeholder="i.e. Felipe" 
                    value={roommatename}
                    onChange={e => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formPaymentCategory">
                <Form.Label>Payment Category</Form.Label>
                <Form.Control 
                    type="category" 
                    placeholder="i.e. Rent" 
                    value={category}
                    onChange={e => setCategory(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formPaymentAmount">
                <Form.Label>Amount Paid</Form.Label>
                <Form.Control 
                    type="amount" 
                    placeholder="i.e. 500 (No $ required)" 
                    value={amount}
                    onChange={e => setAmount(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formPaymentDate">
                <Form.Label>Payment Date</Form.Label>
                <Form.Control 
                    type="date" 
                    placeholder="i.e. 07/19/2020" 
                    value={paymentdate}
                    onChange={e => setDate(e.target.value)}/>
            </Form.Group>
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
            <Button variant="success" 
            onClick={ async () => {
                const roommate_id = roommatename.toLowerCase() === "felipe"? 1 : 2
                const year = 2020
                const payment = {roommatename, category, amount, paymentdate, month, status, roommate_id, year}
                const response = await fetch("api/v1/payments/insert_payment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payment)
                })

                if (response.ok){
                    console.log("response worked!");
                    props.onNewPayment(payment);
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