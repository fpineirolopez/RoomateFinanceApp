import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import PaymentForm from './InsertPaymentForm'

function InsertModal(props){

    return (
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Insert Payment
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Please enter the payment information</h5>
            <PaymentForm month={props.month} onNewPayment={props.onNewPayment} hideModal={props.onHide}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
    )
  }
  export default InsertModal