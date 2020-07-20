import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'

function MonthNavItem(props) {

    return (
        <Nav.Link className="product-nav" eventKey={props.monthName}>
            <NavItem className="product-navbar-text"><p>{props.monthName}</p></NavItem>
        </Nav.Link>
    )
}

export default MonthNavItem