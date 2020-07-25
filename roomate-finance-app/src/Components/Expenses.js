
import React from 'react'
import DisplayCard from './DisplayCard.js'
import { Container, Row, Col } from 'react-bootstrap'

function Expenses(props) {

    console.log(props.data)

    let expensesDisplay 

    if (props.show === false) 
        expensesDisplay = <div/>
    else
        expensesDisplay = <DisplayCard type="E" data={props.data.expenses[0]} title="Expenses"/>

    return (
        <Container>
            <Row>
                <Col xs={true}>
                    {expensesDisplay}
                </Col>
            </Row>
        </Container>
    )
}

export default Expenses