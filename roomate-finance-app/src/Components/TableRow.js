import React from 'react'

function TableRow(props) {

    let date, paid

    if (props.type === "P"){
        date = props.data.payment_date
        if (props.data.status === "Paid")
            paid = true
        else
            paid = false
    }
    else {
        date = props.data.due_date
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
            <td>{date === null ? 'N/a' : date}</td>
            {paid?<td className="paid">Paid</td>:<td className="unpaid">Unpaid</td>}
        </tr>
    )
}
export default TableRow