
import React from 'react'
import DisplayCard from './DisplayCard.js'
import { Container, Row, Col } from 'react-bootstrap'

function Expenses(props) {

    let expensesDisplay 

    if (props.show === false) {
        expensesDisplay = <div/>
    }
    else {
        let tp = []
        props.payments.forEach( entry => {
            var i = tp.findIndex(b => b.category === entry.category)
            if(i === -1){
                var num = +entry.amount
                tp.push({"category": entry.category, "amount": +num})
            }
            else {
                var t = +tp[i].amount
                var sum = +entry.amount
                tp[i].amount = sum + t
            }
        })
        expensesDisplay = <DisplayCard type="E" data={props.data} payments={tp} title="Expenses"/>
    }
        

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