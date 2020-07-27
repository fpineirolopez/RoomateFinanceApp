import React from 'react';
import MonthNavItem from './MonthNavItem';
import MonthPane from './MonthPane'
import monthly_data from '../Data/2020_data.json'
import Expenses from './Expenses.js'
import RoomateData from './RoomateData.js'
import { Tab, DropdownButton} from "react-bootstrap";

class MonthNav extends React.Component{
    constructor() {
        super()
        this.state = {
            monthData: monthly_data,
            expeseData: {
                "Amount":0,"Category":"","Due_Date":"","Month":"","Status":"","Year":0
            },
            show: false,
            monthDisplay: 
            {
                "month_id": 0,
                "month": "",
                "expenses": {},
                "payments": {}
            },
            time: {}
        }
        this.handleSelect = this.handleSelect.bind(this)
    }

    componentWillMount() {
        fetch("/api/v1/expenses/all")
            .then(response => response.json())
            .then(data => {
                this.setState({expenseData: data})
            })
    }

    handleSelect(month_id){
        const newmonth = this.state.monthData.filter(val =>  val.month === month_id )
        this.setState({
            monthDisplay: newmonth[0],
            show: true
        })
    }

    render(){

        const monthNav = this.state.expenseData.map((val) => <MonthNavItem key={val.month} monthName={val.month}/>)

        return (
           <div>
            <Tab.Container defaultActiveKey="">
                {this.state.show === true ? <div/> :
                    <div className="welcome-display">
                        <h1>Welcome to the roomate finance app!</h1><br/>
                        <h4>Please select the month you would like to view/edit</h4>
                    </div>
                }
                <div className="select-column">
                    <DropdownButton className="month-dropdown" title="Select Month" variant="success" id="dropdown-basic-button" onSelect={this.handleSelect}>
                        {monthNav}
                    </DropdownButton >
                    <Tab.Content onSelect={this.handleSelect} className="tab-content">
                        <MonthPane key={this.state.monthDisplay.month_id} monthName={this.state.monthDisplay.month} data={this.state.monthDisplay} />
                    </Tab.Content>
                </div>
            </Tab.Container>
            <br/>
            {/* Expense info display */}
            <Expenses data={this.state.monthDisplay} show={this.state.show}/>
            <br/>
            {/* Roomate info display */}
            <RoomateData data={this.state.monthDisplay.payments} show={this.state.show}/>
            </div>
        )
    }
}

export default MonthNav