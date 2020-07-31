
import React from 'react'
import { Card, Table, Button } from 'react-bootstrap'
import TableRows from './TableRow.js'
import InsertModal from './InsertModal.js'

function DisplayCard(props) {

    const [modalShow, setModalShow] = React.useState(false);

    let displayType, tableRows, title, displayButton

    if (props.type === "P"){
        console.log(props.data)
        displayType = "Payment"
        title = props.title + "'s Payments"
        displayButton = true
        tableRows = props.data.map(val => <TableRows key={val.category} type={props.type} data={val}/>) 
    }
    else {
        displayType = "Due"
        title = props.title
        displayButton = false
        tableRows = props.data.map(val => <TableRows key={val.category} type={props.type} payments={props.payments.filter(p => p.category === val.category)} data={val}/>) 
    }
   
    return (
        <Card>
            <Card.Header>
                <h5><b>{title}</b></h5>
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
            {displayButton? <div className="insert-button"><Button onClick={() => setModalShow(true)} variant="success">Insert</Button></div> : <div/>}
            </Card.Body>
            <InsertModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Card>
    )
}

export default DisplayCard