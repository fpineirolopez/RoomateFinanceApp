// Expenses component, used to render expenses display card and 
// handle logic for marking an expense as paid or unpaid

import React from 'react'
import DisplayCard from './DisplayCard.js'
import { Container, Row, Col } from 'react-bootstrap'

function Expenses(props) {

    // component to be rendered
    let expensesDisplay 

    // if props.show is false, render empty div
    if (props.show === false) {
        expensesDisplay = <div/>
    }
    // else, calculate total payments for each category 
    // (used in child components to determine if expense has been paid for)
    else { 
        let tp = []
        // for each payment, check if in array tp
        props.payments.forEach( entry => {
            var i = tp.findIndex(b => b.category === entry.category)
            // if not in array, get category and amount object (converting amount to int) and push into array
            if(i === -1){ 
                var num = +entry.amount
                tp.push({"category": entry.category, "amount": +num})
            }
            // else, add new amount to total amount stored at given index and update amount value on array
            else {
                var t = +tp[i].amount
                var sum = +entry.amount
                tp[i].amount = sum + t
            }
        })
        // set single display card component as child
        // props
        //   type = E (hardcoded) 
        //   data = props.data (expenseData)
        //   payments = tp array with total payments / category
        //   title = Expenses (hardcoded)
        expensesDisplay = <DisplayCard type="E" data={props.data} payments={tp} title="Expenses"/>
    }
        
    // render element within a single row and col
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