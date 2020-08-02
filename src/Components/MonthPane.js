import React from 'react'
import { Tab } from 'react-bootstrap'

function MonthPane(props) {

    return (
        <Tab.Pane className="tab-pane" eventKey={props.monthName}>
            {props.monthName === "" ? <div/> : <div><h1>{props.monthName}</h1></div>}
        </Tab.Pane>
    )
}

export default MonthPane