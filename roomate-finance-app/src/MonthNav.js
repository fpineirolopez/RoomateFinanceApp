import React from 'react';
import MonthNavItem from './MonthNavItem';
import MonthPane from './MonthPane'
import monthly_data from './Data/2020_data.json'
// import {LinkContainer} from "react-router-bootstrap";
import {Col, Row, Tab, Nav } from "react-bootstrap";

class MonthNav extends React.Component{
    constructor() {
        super()
        this.state = {
            monthData : monthly_data,
            monthDisplay: 
            {
                "month_id": 0,
                "month": "",
                "expenses": {},
                "payments": {}
            }
        }
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect(month_id){
        const newmonth = this.state.monthData.filter(val =>  val.month === month_id )
        this.setState({monthDisplay: newmonth[0]})
    }


    render(){
        
        const monthNav = this.state.monthData.map((val) => <MonthNavItem key={val.month_id} monthName={val.month}/>)

       return (
           <div>
            <Tab.Container defaultActiveKey="">
                <Nav defaultActiveKey="" className="flex-column" onSelect={this.handleSelect}>
                    {monthNav}
                </Nav>
                <Tab.Content onSelect={this.handleSelect}>
                    <MonthPane key={this.state.monthDisplay.month_id} monthName={this.state.monthDisplay.month} data={this.state.monthDisplay} />
                </Tab.Content>
            </Tab.Container>
            </div>
        )
    }
}

export default MonthNav