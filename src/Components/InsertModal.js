// Modal Component from react-bootstrap library
// Calls InsertPaymentForm component to take user input
// and use them in post call to insert payment

import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import PaymentForm from './InsertPaymentForm'

function InsertModal(props){

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
              Insert Payment
            </Modal.Title>
          </Modal.Header>
          {/* Modal body instantiates InsertPaymentForm component */}
          <Modal.Body>
            <h5>Please enter the payment information</h5>
            {/* InsertPaymentForm child component
                props
                  month = display month state
                  onNewPayment = function to update paymentData state upon a successful post call
                  hideModal == ??
            */}
            <PaymentForm month={props.month} onNewPayment={props.onNewPayment} hideModal={props.onHide}/>
          </Modal.Body>
          {/* Footer with close button. OnClick triggers modal OnHide function */}
          <Modal.Footer>
            <Button variant="danger" onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
    )
  }
  export default InsertModal