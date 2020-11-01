// Expenses component, used to render expenses display card and 
// handle logic for marking an expense as paid or unpaid

import React from 'react'
import DisplayCard from './DisplayCard.js'
import { Container, Row, Col, Button} from 'react-bootstrap'
import InsertModal from './InsertModal'

function Expenses(props) {

    // used by bootstrap modal class to determin if modal should display or not
    const [modalShow, setModalShow] = React.useState(false);

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
            {/* if show state is false, display empty div, else display payment data */}
            {props.show === false ? <div/> :  
                    <div>
                        {/* if expenseData is empty, display message */}
                        { props.data.length === 0 ?
                        <div className="welcome-display"><br/><h4>No expense data available for this month</h4></div>:
                        // else map each distinct roomate to a display card, each with its own column
                        <Row>
                            <Col xs={true} className="roomate-columns">
                                {expensesDisplay}
                            </Col>
                        </Row>} <br/>

                        {/* Button used to insert data. 
                            Calls InsertModal component by setting state onClick to true using 
                            setModalShow method 
                        */}
                        <div className="insert-button">
                            <Button variant="success" onClick={() => setModalShow(true)}>Insert Expense</Button>

                            {/* InsertModal child component
                                props
                                    onNewPayment = passes function from parent object to update paymentData upon a successful post call
                                    month = current month state from parent
                                    show = show state from parent
                                    onHide = used to hide modal using setModalShow method and passing false 
                            */}
                            <InsertModal
                                onNewExpense = {props.onNewExpense}
                                show={modalShow}
                                source={"Expense"}
                                onHide={() => setModalShow(false)}
                            />
                        </div>
                    </div>
                }
        </Container>
    )
}

export default Expenses