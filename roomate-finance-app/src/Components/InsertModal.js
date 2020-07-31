import React from 'react'
import { Modal, Button, Container } from 'react-bootstrap'

function InsertModal(props){

    return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title"
          centered
          className="product-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <b>Insert Payment</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container className="product-modal-body">
              
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button className="insert-button" variant="success" size="md" active onClick={this.props.onHide}><b>Close</b></Button>
          </Modal.Footer>
        </Modal>
    )
  }
  export default InsertModal