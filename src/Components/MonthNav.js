// Month Nav class is the center piece - control center of the front end
// Class component: calls api's to fetch data and manages month switching 
// and individual month expense and payment data fetching

import React from 'react';
import MonthNavItem from './MonthNavItem';
import Expenses from './Expenses.js'
import RoomateData from './RoomateData.js'
import MonthPane from './MonthPane.js'
import { Tab, DropdownButton, Spinner} from "react-bootstrap";


class MonthNav extends React.Component{
    constructor() {
        super()
        this.state = {
            expenseData: [{}],  // store and display expense data for the selected month
            paymentData: [{}],  // store and display payment data for the selected month
            months: [],         // contains months from api to fill dropdown navigator
            show: false,        // decide whether to show welcome message (false) or data (true)
            monthDisplay: {},   // hold selected month
            isFetching: false   // stop rendering when updating state (false render spinner, true render components)
        }
        this.handleSelect = this.handleSelect.bind(this) // used to change data when a month is selected
    }

    // on component mount, fetch data for all months available and store it to state
    componentDidMount() {
        fetch("/api/v1/expenses/months")
            .then(response => response.json())
            .then(data => {
                const m = []
                data.forEach(element => {
                    // save each month only once
                    if (m.findIndex(b => b.month === element.month) === -1)
                    m.push(element) 
                });
                // store data into state
                this.setState({months: m})
            })
    }

    // async method to fetch expense and payment data for the selected month, as well as update month_display
    async handleSelect(month){
        // set isFetching to true to stop component re-rendering
        this.setState({isFetching:true, paymentData: [{}]})
        // get display month from months array
        const newmonth = this.state.months.filter(val =>  val.month === month)
        // call expenses and payment api fecth passing the selected month
        Promise.all([
            fetch('/api/v1/expenses?month='+ month),
            fetch('/api/v1/payments?month='+ month)
        ])
        .then(([res1, res2]) => Promise.all([res1.json(),res2.json()]))
        //update state with received data and new display month
        .then(([expense_data, payment_data]) => {
            this.setState({
                monthDisplay: newmonth[0],
                show: true,
                expenseData: expense_data,
                paymentData: payment_data, 
                isFetching: false
            })
        });
    }

    render(){

        // map months to dropdown menu items
        const monthNav = this.state.months.map((val) => <MonthNavItem key={val.month} monthName={val.month}/>)
        return (
            // if isFetching is true, display spinner
            this.state.isFetching?
            <div className='spinner-wrapper'><Spinner animation="border" variant="success"/></div> 
            : 
            // else display content
            <div>
                {/* using bootstrap tabs with dropdown for navigation and month title for tab content */}
                <Tab.Container defaultActiveKey="">
                    {/* if state show if false, display welcome message, else display data */}
                    {this.state.show === true ? <div/> :
                        <div className="welcome-display">
                            <h1>Welcome to the roomate finance app!</h1><br/>
                            <h4>Please select the month you would like to view/edit</h4>
                        </div>
                    }
                    {/* Dropdown button with mapped months entries constant */}
                    <div className="select-column">
                        <DropdownButton className="month-dropdown" title="Select Month" variant="success" id="dropdown-basic-button" onSelect={this.handleSelect}>
                            {monthNav}    
                        </DropdownButton >
                        {/* Month pane displays the monht's name as a title */}
                        <Tab.Content onSelect={this.handleSelect} className="tab-content">
                            <MonthPane key={this.state.monthDisplay.month} monthName={this.state.monthDisplay.month} data={this.state.monthDisplay} />
                        </Tab.Content>
                    </div>
                </Tab.Container>
                {/* Expense info display component
                    props:
                        data = expenseData
                        payments = paymentData (used to determine if an expense has been paid or not)
                        show = show state
                        isFetching = is Fetching state (not used)
                */}
                <Expenses 
                    data={this.state.expenseData} 
                    payments={this.state.paymentData} 
                    show={this.state.show} 
                    isFetching={this.state.isFetching}/>
                {/* Roomate info display component
                    props:
                        data = paymentData
                        show = show state
                        isFetching = is Fetching state (not used)
                        month = select month state
                        onNewPayment = function triggered on successful post request to insert new payment
                                       Used to update paymentData state
                */}
                <RoomateData 
                    data={this.state.paymentData} 
                    show={this.state.show} 
                    isFetching={this.state.isFetching} 
                    month={this.state.monthDisplay}
                    onNewPayment={payment => this.setState(prevState => {
                        const paymentData = [...prevState.paymentData, payment]
                        return {paymentData}
                        }
                    )}/>
            </div>
        )
    }
}

export default MonthNav