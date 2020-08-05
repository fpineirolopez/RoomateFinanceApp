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
            expenseData: [{}],
            paymentData: [{}],
            months: [],
            show: false,
            monthDisplay: {},
            isFetching: false
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
        this.setState({isFetching:true, paymentData: [{}]})
        const newmonth = this.state.months.filter(val =>  val.month === month)
        Promise.all([
            fetch('/api/v1/payments?month='+ month),
            fetch('/api/v1/expenses?month='+ month)
        ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([payment_data, expense_data]) => {
            payment_data.forEach(p => p.amount = parseFloat(p.amount).toFixed(2))
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

        const monthNav = this.state.months.map((val) => <MonthNavItem key={val.month} monthName={val.month}/>)
        return (

        this.state.isFetching?
            <div className='spinner-wrapper'><Spinner animation="border" variant="success"/></div> 
             : 
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
                <Expenses 
                    data={this.state.expenseData} 
                    payments={this.state.paymentData} 
                    show={this.state.show} 
                    isFetching={this.state.isFetching}/>
                {/* Roomate info display */}
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