import React from 'react'

function TableRow(props) {

    let date, paid

    if (props.type === "P"){
        if (props.data.paymentdate === null)
            date = "N/a";
        else if (props.data.paymentdate.length === 10)
            date = dateFlip(props.data.paymentdate);
        else 
            splitDate(props.data.paymentdate);
        if (props.data.status === "Paid")
            paid = true
        else
            paid = false
    }
    else {
        if (props.data.duedate === null)
            date = "N/a";
        else if (props.data.duedate.length === 10)
            date = dateFlip(props.data.duedate);
        else 
            splitDate(props.data.duedate);
        if (props.payments[0] !== undefined) {
            if (props.data.amount === props.payments[0].amount)
                paid = true
            else
                paid = false
        }
    }

    return (
        <tr>
            <td>{props.data.category}</td>
            <td>${props.data.amount}</td>
            <td>{date}</td>
            {paid?<td className="paid">Paid</td>:<td className="unpaid">Unpaid</td>}
        </tr>
    )
}
export default TableRow

function dateFlip(date) {
    var parts = date.split("-");
    const day = parts[2];
    const month =  parts[1];
    const year = parts[0];

    return (month + '-' + day + '-' + year);
}

function splitDate(date){

    var parts = date.split(" ");
    const day = parts[1];
    const m =  parts[2];
    const year = parts[3];

    const month = (new Date(Date.parse(m +" 1, 2012")).getMonth()+1).toString();

    return ((month.length === 1? '0' + month : month) + '-' + day + '-' + year);
}