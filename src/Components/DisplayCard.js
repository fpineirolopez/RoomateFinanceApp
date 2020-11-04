// DisplayCard component that makes use of react-bootstrap cards and tables
// single expense display card (called by Expenses.js) 
// 1:n payment display cards (called by RoomateData.js)
// received data from parent component and renders card object and table
// maps data to TableRows child component to display data


import React from 'react'
import { Card, Table } from 'react-bootstrap'
import TableRows from './TableRow.js'

function DisplayCard(props) {

    let displayType, tableRows, title

    // if type == P, then display PaymentData
    // set display type to payment, title to roommate's name's payments
    // and map TableRowas component to data
    if (props.type === "P"){
        displayType = "Payment"
        title = props.title + "'s Payments"
        // TableRows component mapped from paymentData state for given roommate
        // props
        //  type = type (harcoded to Payment or Due)
        //  data = payment data for roommate
        tableRows = props.data.map(val => <TableRows key={val.id} type={props.type} data={val} onEdit={props.onEdit} onDelete={props.onDelete} />) 
    }
    // if type == E, then display ExpenseData
    // set display type to due, title to title prop, which was hardcoded in parent to expense
    // and map TableRowas component to data
    else {
        displayType = "Due"
        title = props.title
        // TableRows component mapped from expenseData state 
        // props
        //  type = type (harcoded to Payment or Due)
        //  payments = cumulative payment data for that month and matching category. Used to display expense as Paid/Unpaid
        //  data = expense data 
        tableRows = props.data.map(val => <TableRows key={val.id} type={props.type} payments={props.payments.filter(p => p.category === val.category)} data={val} onEdit={props.onEdit} onDelete={props.onDelete}/>) 
    }
   
    // render card and table component
    return (
        <Card>
            <Card.Header>
                {/* set header of card to title prop, which would be either hardcoded "Expenses" 
                    or the roommate's name's payments */}
                <h5><b>{title}</b></h5>
            </Card.Header>
            <Card.Body>
            {/*  Using a responsive table object */}
            <Table responsive bordered> 
                {/* Table heading is somewhat static. All that changes is displayType
                    Expenses = displayType says Due
                    Payments = displayType says Payment
                */}
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount {displayType}</th>
                        <th>{displayType} Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead> 
                <tbody>
                    {/* Body is made up of mapped TableRows components */}
                    {tableRows}
                </tbody>
            </Table>
            </Card.Body>
        </Card>
    )
}

export default DisplayCard