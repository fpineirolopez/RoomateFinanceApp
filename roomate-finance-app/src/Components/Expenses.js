
import React from 'react'
import DisplayCard from './DisplayCard.js'
import { Container, Row, Col } from 'react-bootstrap'

function Expenses(props) {

    let expensesDisplay 

    if (props.show === false) 
        expensesDisplay = <div/>
    else
        expensesDisplay = <DisplayCard type="E" data={props.data} title="Expenses"/>

    return (
        <Container>
            <Row>
                <Col xs={true} className="roomate-columns">
                    {expensesDisplay}
                </Col>
            </Row>
        </Container>
    )
}

export default Expenses