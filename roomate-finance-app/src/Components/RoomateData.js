
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import DisplayCard from './DisplayCard'

function RoomateData(props) {

    console.log(props.data)

    let display

    if(props.show === false){
         display=<div></div>
    }
    else {
         display = props.data.map((val) => 
            <Col key={val.roomate_id} lg={true} className="roomate-columns">
                <DisplayCard key={val.roomate_id} type="P" data={val} title={val.roomate}/>
            </Col>
         )
    }
   

    return (
        <Container>
            <Row>
                {display}
            </Row>
        </Container>
    )
}

export default RoomateData