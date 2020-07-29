import React from 'react';
import MonthNavItem from './MonthNavItem';
import Expenses from './Expenses.js'
import RoomateData from './RoomateData.js'
import MonthPane from './MonthPane.js'
import { Tab, DropdownButton} from "react-bootstrap";

class MonthNav extends React.Component{
    constructor() {
        super()
        this.state = {
            expenseData: [{}],
            paymentData: [{}],
            months: [],
            show: false,
            monthDisplay: {}
        }
        this.handleSelect = this.handleSelect.bind(this)
    }

    componentDidMount() {
        fetch("/api/v1/expenses/months")
            .then(response => response.json())
            .then(data => {
                const m = []
                data.forEach(element => {
                    if (m.findIndex(b => b.month === element.month) === -1)
                    m.push(element) 
                });
                this.setState({months: m})
            })
    }

    handleSelect(month){
        const newmonth = this.state.months.filter(val =>  val.month === month)
        this.setState({
            monthDisplay: newmonth[0],
            show: true
        })
        fetch("/api/v1/expenses?month=" + month)
            .then(response => response.json())
            .then(data => {
                this.setState({expenseData: data})
            })
        fetch("/api/v1/payments?month=" + month)
            .then(response => response.json())
            .then(data => {
                this.setState({paymentData: data})
            })
    }

    render(){

        const monthNav = this.state.months.map((val) => <MonthNavItem key={val.month} monthName={val.month}/>)

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
                            <MonthPane key={this.state.monthDisplay.month} monthName={this.state.monthDisplay.month} data={this.state.monthDisplay} />
                        </Tab.Content>
                    </div>
                </Tab.Container>
                {/* Expense info display */}
                <Expenses data={this.state.expenseData} show={this.state.show}/>
                {/* Roomate info display */}
                <RoomateData data={this.state.paymentData} show={this.state.show}/>
            </div>
        )
    }
}

export default MonthNav