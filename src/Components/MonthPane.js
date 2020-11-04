// simplae Tab.Pane react-bootstrap object, used for month name display

import React from 'react'
import { Tab } from 'react-bootstrap'

function MonthPane(props) {

    console.log(props.monthName)

    return (
        <Tab.Pane className="tab-pane" eventKey={props.monthName}>
            <div><h1>{props.monthName}</h1></div>
            {/* {props.monthName === null ? <div/> : <div><h1>{props.monthName}</h1></div>} */}
        </Tab.Pane>
    )
}

export default MonthPane