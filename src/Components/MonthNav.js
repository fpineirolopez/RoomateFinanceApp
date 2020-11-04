// Month Nav class is the center piece - control center of the front end
// Class component: calls api's to fetch data and manages month switching 
// and individual month expense and payment data fetching

import React from 'react';
import MonthNavItem from './MonthNavItem';
import Expenses from './Expenses.js'
import RoomateData from './RoomateData.js'
// import MonthPane from './MonthPane.js'
import { Tab, DropdownButton, Spinner, Row, Button} from "react-bootstrap";


class MonthNav extends React.Component{
    constructor() {
        super()
        this.state = {
            expenseData: [{}],  // store and display expense data for the selected month
            paymentData: [{}],  // store and display payment data for the selected month
            years: [],          // store and display all years in database
            yearDisplay: '',    // store and display selected year
            months: ['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], //month list
            monthDisplay: '',   // store and display selected year
            titleDisplay: '',   // used to display title (selected month and year)
            warning: false,     // used to display warning message
            show: false,        // decide whether to show welcome message (false) or data (true)
            isFetching: false   // stop rendering when updating state (false render spinner, true render components)
        }
        this.handleSelect = this.handleSelect.bind(this) // used to change data when a go is clicked
        this.handleSelectYear = this.handleSelectYear.bind(this) // used to update year when a year is selected from the dropdown
        this.handleSelectMonth = this.handleSelectMonth.bind(this) // used to update month when a month is selected from the dropdown
        this.handleDataUpdate = this.handleDataUpdate.bind(this) // used to change data when a payment.expense is inserted/edited/deleted
    }

    // on component mount, fetch data for all months available and store it to state
    componentDidMount() {
        fetch("/api/v1/years")
            .then(response => response.json())
            .then(data => {
                // store data into state
                this.setState({years: data})
            })
    }

    // async method to fetch expense and payment data for the selected month, as well as update month_display
    async handleDataUpdate(month, year){
        // set isFetching to true to stop component re-rendering
        this.setState({isFetching:true, paymentData: [{}]})
        // call expenses and payment api fecth passing the selected month
        const yearsEndpoint = "/api/v1/years"
        const expenseEndpoint = "/api/v2/expenses/" + year + "/" + month
        const paymentEndpoint = "/api/v2/payments/" + year + "/" + month
        Promise.all([
            fetch(yearsEndpoint),
            fetch(expenseEndpoint),
            fetch(paymentEndpoint)
        ])
        .then(([res1, res2, res3]) => Promise.all([res1.json(),res2.json(), res3.json()]))
        //update state with received data and new display month
        .then(([year_data, expense_data, payment_data]) => {
            this.setState({
                years: year_data,
                yearDisplay: year,
                monthDisplay: month,
                titleDisplay: month + ' ' + year,
                show: true,
                expenseData: expense_data,
                paymentData: payment_data, 
                isFetching: false
            })
        });
    }

    async handleSelect(){
        // set isFetching to true to stop component re-rendering
        this.setState({isFetching:true, paymentData: [{}]})
        // if either year or month have not been selected, display warning
        if (this.state.yearDisplay === '' || this.state.monthDisplay === '') {
            this.setState({
                warning: true,
                isFetching: false
            })
        }
        else {
            // call expenses and payment api fecth passing the selected month
            const expenseEndpoint = "/api/v2/expenses/" + this.state.yearDisplay + "/" + this.state.monthDisplay
            const paymentEndpoint = "/api/v2/payments/" + this.state.yearDisplay + "/" + this.state.monthDisplay
            Promise.all([
                fetch(expenseEndpoint),
                fetch(paymentEndpoint)
            ])
            .then(([res1, res2]) => Promise.all([res1.json(),res2.json()]))
            //update state with received data and new display month
            .then(([expense_data, payment_data]) => {
                this.setState({
                    warning: false,
                    titleDisplay: this.state.monthDisplay + ' ' + this.state.yearDisplay,
                    show: true,
                    expenseData: expense_data,
                    paymentData: payment_data, 
                    isFetching: false
                })
            });
        }
    }

    async handleSelectYear(year){
        // get display month from months array
        const newYear = this.state.years.filter(val =>  val === parseInt(year))
        // store data into state
        this.setState({
            yearDisplay: newYear
        })
    }

    // async method to fetch expense and payment data for the selected month, as well as update month_display
    async handleSelectMonth(month){
        // get display month from months array
        const newMonth = this.state.months.filter(val =>  val === month)
        // store data into state
        this.setState({
            monthDisplay: newMonth
        })
    }

    render(){

        // map months to dropdown menu items
        const monthNav = this.state.months.map((val) => <MonthNavItem key={val} monthName={val}/>)
        const yearNav = this.state.years.map((val) => <MonthNavItem key={val} monthName={val}/>)

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
                            <h4>Please select the year and month you would like to view/edit and press Go</h4>
                        </div>
                    }
                    {/* Dropdown button with mapped months entries constant */}
                    <div className="select-column">
                        <h1>{this.state.titleDisplay}</h1>
                        <Row>
                            <DropdownButton className="month-dropdown" title={this.state.monthDisplay === '' ? 'Select Month' : this.state.monthDisplay} variant="success" id="dropdown-basic-button" onSelect={this.handleSelectMonth}>
                                {monthNav}    
                            </DropdownButton >
                            <DropdownButton className="month-dropdown" title={this.state.yearDisplay === '' ? 'Select Year' : this.state.yearDisplay} variant="success" id="dropdown-basic-button" onSelect={this.handleSelectYear}>
                                {yearNav}    
                            </DropdownButton >
                            <Button variant="success" className="month-dropdown" id="dropdown-basic-button" onClick={this.handleSelect}>Go</Button>
                        </Row>
                    </div>
                </Tab.Container>
                {this.state.warning === true ? <h5 className="errorMessage">A month and a year must be selected before pressing Go</h5> : <div/> }
                {/* Expense info display component
                    props:
                        data = expenseData
                        payments = paymentData (used to determine if an expense has been paid or not)
                        show = show state
                        isFetching = is Fetching state (not used)                        
                        onNewExpense = calls function to update all months, payments, and expenses
                */}
                <Expenses 
                    data={this.state.expenseData} 
                    payments={this.state.paymentData} 
                    show={this.state.show} 
                    isFetching={this.state.isFetching}
                    onNewExpense={this.handleDataUpdate}
                    onEdit={this.handleDataUpdate}
                    onDelete={this.handleDataUpdate}/>
                {/* Roomate info display component
                    props:
                        data = paymentData
                        show = show state
                        isFetching = is Fetching state (not used)
                        month = select month state
                        onNewPayment = calls function to update all months, payments, and expenses
                */}
                <RoomateData 
                    data={this.state.paymentData} 
                    show={this.state.show} 
                    isFetching={this.state.isFetching} 
                    month={this.state.monthDisplay}
                    onNewPayment={this.handleDataUpdate}
                    onEdit={this.handleDataUpdate}
                    onDelete={this.handleDataUpdate}/>
            </div>
        )
    }
}

export default MonthNav