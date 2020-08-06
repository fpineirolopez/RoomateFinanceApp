// Roomate Data component parses payment data based on roommate_name,
// displays payment information if available (or message otherwise),
// and has button that calls modal with form to insert data through
// a post request


import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import DisplayCard from './DisplayCard'
import InsertModal from './InsertModal'

function RoomateData(props) {

    // used by bootstrap modal class to determin if modal should display or not
    const [modalShow, setModalShow] = React.useState(false);

    // store disitnct roomates from paymentData. Used to map DisplayCard components for each roomate
    const roommates = [] 
    props.data.forEach ( payments => {
        // if roommatename is not in array, push object
        if (roommates.findIndex(b => b.roommatename === payments.roommatename) === -1)
            roommates.push(payments)
    })

    return (
        <Container>
                {/* if show state is false, display empty div, else display payment data */}
                {props.show === false ? <div/> :  
                    <div>
                        {/* if paymentData is empty, display message */}
                        { props.data.length === 0?
                        <div className="welcome-display"><br/><h4>No payment data available for this month</h4></div>:
                        // else map each distinct roomate to a display card, each with its own column
                        <Row>
                            {roommates.map((val) => 
                                <Col key={val.roommatename} lg={true} className="roomate-columns">
                                    {/* DisplayCard child component
                                        props
                                            type = P (hardcoded)
                                            data = paymentData filtered by the corresponding roommatename
                                            title = name of roommate
                                     */}
                                    <DisplayCard key={val.roommatname} type="P" data={props.data.filter( d => d.roommatename === val.roommatename)} title={val.roommatename}/>
                                </Col>) }
                        </Row>} <br/>

                        {/* Button used to insert data. 
                            Calls InsertModal component by setting state onClick to true using 
                            setModalShow method 
                        */}
                        <div className="insert-button">
                            <Button variant="success" onClick={() => setModalShow(true)}>Insert Payment</Button>

                            {/* InsertModal child component
                                props
                                    onNewPayment = passes function from parent object to update paymentData upon a successful post call
                                    month = current month state from parent
                                    show = show state from parent
                                    onHide = used to hide modal using setModalShow method and passing false 
                            */}
                            <InsertModal
                                onNewPayment = {props.onNewPayment}
                                month={props.month}
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                        </div>
                    </div>
                }
            
        </Container>
    )
}

export default RoomateData