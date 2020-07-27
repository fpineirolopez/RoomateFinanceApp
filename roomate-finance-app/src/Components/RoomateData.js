
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import DisplayCard from './DisplayCard'

function RoomateData(props) {

    return (
        <Container>
            <Row>
                {props.show === false ? <div/> :  
                    props.data.map((val) => 
                        <Col key={val.roomate_id} lg={true} className="roomate-columns">
                            <DisplayCard key={val.roomate_id} type="P" data={val} title={val.roomate}/>
                        </Col>) 
                }
            </Row>
        </Container>
    )
}

export default RoomateData