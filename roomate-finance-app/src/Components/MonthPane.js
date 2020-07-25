import React from 'react'
import { Tab } from 'react-bootstrap'

function MonthPane(props) {

    let display 

    if (props.monthName === "")
    {
        display = <div></div>
                
    }
    else {
        display = 
                <div>
                    <h1>{props.monthName}</h1>
                </div>
    }


    return (
        <Tab.Pane className="tab-pane" eventKey={props.monthName}>
            {display}
        </Tab.Pane>
    )
}

export default MonthPane