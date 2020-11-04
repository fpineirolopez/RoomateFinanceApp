// Simple react-bootstrap Dropdown.Item with month name
// Used for site navigation

import React from 'react'
import { Dropdown } from 'react-bootstrap'

function MonthNavItem(props) {

    return (
        // <Dropdown.Item className="product-nav" eventKey={props.monthName}><p>{props.monthName}</p></Dropdown.Item>
        <Dropdown.Item className="product-nav" eventKey={props.monthName}><p>{props.monthName}</p></Dropdown.Item>
    )
}

export default MonthNavItem