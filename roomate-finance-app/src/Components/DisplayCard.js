
import React from 'react'
import { Card, Table } from 'react-bootstrap'


function DisplayCard(props) {

    let displayType, elementRent, elementElectricity

    if (props.type === "P"){
        displayType = "Payment"
        elementRent = props.data.rent_payment_date
        elementElectricity = props.data.electricity_payment_date
    }
    else {
        displayType = "Due"
        elementRent = props.data.rent_due_date
        elementElectricity = props.data.electricity_due_date
    }

    return (
        <Card>
            <Card.Header>
                <h5><b>{props.title}</b></h5>
            </Card.Header>
            <Card.Body>
            <Table responsive bordered> 
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount {displayType}</th>
                        <th>{displayType} Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Rent</td>
                        <td>{props.data.rent}</td>
                        <td>{elementRent}</td>
                    </tr>
                    <tr>
                        <td>Electricity</td>
                        <td>{props.data.electricity}</td>
                        <td>{elementElectricity}</td>
                    </tr>
                </tbody>
            </Table>
            </Card.Body>
        </Card>
    )
}

export default DisplayCard