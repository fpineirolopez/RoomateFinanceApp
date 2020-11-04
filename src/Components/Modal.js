// Modal Component from react-bootstrap library
// Calls InsertPaymentForm component to take user input
// and use them in post call to insert payment

import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import PaymentForm from './PaymentForm'
import ExpenseForm from './ExpenseForm'
import EditForm from './EditForm'
import DeleteForm from './DeleteForm'

function ModalComponent(props){

    let title, message, content 

    if (props.source === "Expense" ) {
      title = "Insert Expense";
      message = "Please enter the expense information";
      content = <ExpenseForm onNewExpense={props.onNewExpense} hideModal={props.onHide}/>
      // content = <h3>TESTING EXPENSE INSERT LOGIC</h3>
    }
    else if (props.source === "Payment") {
      title = "Insert Payment";
      message = "Please enter the payment information";
      content = <PaymentForm month={props.month} onNewPayment={props.onNewPayment} hideModal={props.onHide}/>
    }
    else if (props.source === "Edit P") {
      title = "Edit Payment";
      message = "Edit the payment information";
      content = <EditForm month={props.month} data={props.data} type={"P"} date={props.date} onEdit={props.onEdit} hideModal={props.onHide}/>
      // content = <h3>TESTING EDIT PAYMENT LOGIC</h3>
    }
    else if (props.source === "Edit E") {
      title = "Edit Expense";
      message = "Edit the expense information";
      content = <EditForm month={props.month} data={props.data} type={"E"} date={props.date} onEdit={props.onEdit} hideModal={props.onHide}/>
      // content = <h3>TESTING EDIT EXPENSE LOGIC</h3>
    }
    else if (props.source === "Delete P"){
      title = "Delete Payment";
      message = "Are you sure you want to delete this payment?";
      content = <DeleteForm month={props.month} data={props.data} type={"P"} onDelete={props.onDelete} hideModal={props.onHide}/>
      // content = <h3>TESTING DELETE PAYMENT LOGIC</h3>
    }
    else {
      title = "Delete Expense";
      message = "Are you sure you want to delete this expense?";
      content = <DeleteForm month={props.month} data={props.data} type={"E"} onDelete={props.onDelete} hideModal={props.onHide}/>
      // content = <h3>TESTING DELETE EXPENSE LOGIC</h3>
    }

    // sections from this code are directly from bootstrap 
    return (
        //modal object from react-bootstrap. Using a vertically centered medium modal
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        > 
          {/* Modal header with title and close button */}
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {title}
            </Modal.Title>
          </Modal.Header>
          {/* Modal body instantiates InsertPaymentForm component */}
          <Modal.Body>
            <h5>{message}</h5>
            {/* Form */}
            {content}
          </Modal.Body>
          {/* Footer with close button. OnClick triggers modal OnHide function */}
          <Modal.Footer>
            <Button variant="light" onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
    )
  }
  export default ModalComponent