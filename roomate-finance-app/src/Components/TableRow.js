import React from 'react'

function TableRow(props) {

    let date 
    if (props.type === "P")
        date = props.data.payment_date
    else
        date = props.data.due_date

    return (
        <tr>
            <td>{props.data.category}</td>
            <td>${props.data.amount}</td>
            <td>{date === null ? 'N/a' : date}</td>
            <td>{props.data.status}</td>
        </tr>
    )
}
export default TableRow