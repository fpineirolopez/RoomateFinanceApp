
import React from 'react'
import { Card, Table } from 'react-bootstrap'
import TableRows from './TableRow.js'

function DisplayCard(props) {

    let displayType, tableRows

    // console.log(props.data)

    if (props.type === "P"){
        displayType = "Payment"
        tableRows = props.data.map(val => <TableRows key={val.category} type={props.type} data={val}/>) 
    }
    else {
        displayType = "Due"
        tableRows = props.data.map(val => <TableRows key={val.category} type={props.type} data={val}/>) 
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
                        <th>Status</th>
                    </tr>
                </thead> 
                <tbody>
                    {tableRows}
                </tbody>
            </Table>
            </Card.Body>
        </Card>
    )
}

export default DisplayCard