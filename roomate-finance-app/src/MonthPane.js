import React from 'react'
import { Tab } from 'react-bootstrap'

function MonthPane(props) {

    let display 

    if (props.monthName === "")
    {
        display = 
                <div>
                    <h3>Welcome to the roomate finance app!</h3>
                    <p>Please select the month you would like to view/edit</p>
                </div>
    }
    else {
        display = 
                <div>
                    <h3>You are viewing data for the following month: {props.monthName}</h3>
                    <h3>Data</h3>
                    <ul>
                        <li>Month: {props.data.month}</li>
                        <li>Rent Due: {props.data.expenses[0].rent}</li>
                        <li>Rent Due Date: {props.data.expenses[0].rent_due_date}</li>
                        <li>Electricity Due: {props.data.expenses[0].electricity}</li>
                        <li>Electricity Due Date: {props.data.expenses[0].electricity_due_date}</li>
                    </ul>
                </div>
    }


    return (

     
        <Tab.Pane eventKey={props.monthName}>
            {display}
        </Tab.Pane>
    )
}

export default MonthPane