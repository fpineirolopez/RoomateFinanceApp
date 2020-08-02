
import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import DisplayCard from './DisplayCard'
import InsertModal from './InsertModal'

function RoomateData(props) {

    const [modalShow, setModalShow] = React.useState(false);

    const roommates = [] 

    props.data.forEach ( payments => {
        if (roommates.findIndex(b => b.roommate_name === payments.roommate_name) === -1)
        roommates.push(payments)
    })

    return (
        <Container>
            
                {props.show === false ? <div/> :  
                    <div>
                        { props.data.length === 0?
                        <div className="welcome-display"><br/><h4>No payment data available for this month</h4></div>:
                        <Row>
                            {roommates.map((val) => 
                                <Col key={val.roommate_name} lg={true} className="roomate-columns">
                                    <DisplayCard key={val.roommate_name} type="P" data={props.data.filter( d => d.roommate_name === val.roommate_name)} title={val.roommate_name}/>
                                </Col>) }
                        </Row>} <br/>
                        <div className="insert-button">
                            <Button variant="success" onClick={() => setModalShow(true)}>Insert Payment</Button>

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