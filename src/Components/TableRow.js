// TableRows component that takes the filtered expense or payment data
// and displays them in their corresponging column. Also has logic to determine
// if expense to be displayed is Paid/Unpaid


import React from 'react'
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import EditModal from './Modal.js'
import DeleteModal from './Modal.js'

function TableRow(props) {

    // used by bootstrap modal class to determin if modal should display or not
    const [modalShowEdit, setModalEditShow] = React.useState(false);
    const [modalShowDel, setModalDelShow] = React.useState(false);

    let date, paid, num

    // get amount from data prop and convert to decimal number (for calculations and displaying)
    num = +props.data.amount

    // if type prop == P, then paymentData will be displayed
    if (props.type === "P"){
        //if date is null or undefined set it to N/a
        if (props.data.paymentdate === null || props.data.paymentdate === undefined)
            date = "N/a";
        //else check if length is 10, if so call dateFlip function flip to display in mm/dd/yyyy format
        else if (props.data.paymentdate.length === 10)
            date = dateFlip(props.data.paymentdate);
        //else data coming from DB, call split date to remove time and format as mm-dd-yyyy
        else 
            date = splitDate(props.data.paymentdate);

        // set status to data prop status value    
        if (props.data.status === "Paid")
            paid = true
        else
            paid = false
    }
    //else type prop was E, so expenseData will be displayed
    else {
        //if date is null or undefined set it to N/a
        if (props.data.duedate === null || props.data.duedate === undefined)
            date = "N/a";
        //else check if length is 10, if so call dateFlip function flip to display in mm-dd-yyyy format
        else if (props.data.duedate.length === 10)
            date = dateFlip(props.data.duedate);
        //else data coming from DB, call split date to remove time and format as mm/dd/yyyy
        else 
            date = splitDate(props.data.duedate);

        // set status to data prop status value    
        if (props.data.status === "Paid")
            paid = true
        else
            paid = false

        // check if total paymets are not undefined
        // if so, get total payments amount and compare to expense amount    
        // if (props.payments[0] !== undefined) {
        //     var payment = +props.payments[0].amount
        //     if (num <= payment) //if payments are greater than or equal to expense, set state to Paid
        //         paid = true
        //     else // else set to Unpaid
        //         paid = false
        // }
    }

    // display table row component based on variables passed as props or defined above
    return (
        <tr>
            <td>{props.data.category}</td>
            <td>${num}</td>
            <td>{date}</td>
            {paid?<td className="paid">Paid</td>:<td className="unpaid">Unpaid</td>} 
            <td>
                <Button variant="light" className="small-btn" onClick={() => setModalEditShow(true)}><FontAwesomeIcon icon={faEdit}/></Button>
                <EditModal
                                    onEdit = {props.onEdit}
                                    data={props.data}
                                    date={date}
                                    month={props.month}
                                    show={modalShowEdit}
                                    source={"Edit " + props.type}
                                    onHide={() => setModalEditShow(false)}
                                />
                <Button variant="light" className="small-btn" onClick={() => setModalDelShow(true)}><FontAwesomeIcon icon={faTrash}/></Button>
                <DeleteModal
                                    onDelete = {props.onDelete}
                                    data={props.data}
                                    month={props.month}
                                    show={modalShowDel}
                                    source={"Delete " + props.type}
                                    onHide={() => setModalDelShow(false)}
                                />
            </td>
        </tr>
    )
}
export default TableRow

// function to grab correct length date and display in mm-dd-yyyy format
function dateFlip(date) {
    
    var parts = date.split("-");
    const day = parts[2];
    const month =  parts[1];
    const year = parts[0];

    return (month + '-' + day + '-' + year);
}

// function to grab long-form DB date and display in mm-dd-yyyy format
function splitDate(date){

    var parts = date.split(" ");
    const day = parts[1];
    const m =  parts[2];
    const year = parts[3];

    const month = (new Date(Date.parse(m +" 1, 2012")).getMonth()+1).toString();

    return ((month.length === 1? '0' + month : month) + '-' + day + '-' + year);
}