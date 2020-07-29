
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import DisplayCard from './DisplayCard'

function RoomateData(props) {

    const roommates = [] 
    
    props.data.forEach ( payments => {
        if (roommates.findIndex(b => b.roommate_name === payments.roommate_name) === -1)
        roommates.push(payments)
    })
    
    return (
        <Container>
            <Row>
                {props.show === false ? <div/> :  
                    roommates.map((val) => 
                        <Col key={val.roommate_name} lg={true} className="roomate-columns">
                            <DisplayCard key={val.roommate_name} type="P" data={props.data.filter( d => d.roommate_name === val.roommate_name)} title={val.roommate_name}/>
                        </Col>) 
                }
            </Row>
        </Container>
    )
}

export default RoomateData