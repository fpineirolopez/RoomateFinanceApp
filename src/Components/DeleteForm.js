// react-bootstrap form component that takes in user inputs
// and generates json object to pass in post request to delete
// Payment/Expense data

import React from 'react'
import { Button } from 'react-bootstrap'


function DeleteForm(props){

    return (
        <div>
            {/* submit button */}
            <Button variant="success" 
            // on click method calls async post request by generatin json object 
            // usen state components filled with user inputted data
            onClick={ async () => {
     
                //select correct endpoint and data format
                let endpoint

                if (props.type === "P")
                    endpoint = "/api/v1/payments/delete_payment/" + props.data.id
                else 
                    endpoint = "/api/v1/expenses/delete_expense/" + props.data.id
                

                // post request response, used to evaluate if response was successfull
                const response = await fetch(endpoint, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        }
                })

                // if response was successful, call onNewExpense function passed as a prop to update 
                // Expense data on parent components and accross the site, and reset state constants
                if (response.ok){
                    // props.onNewExpense(expense);
                    props.onDelete(props.data.month, props.data.year);
                }
            }}>
                Confirm
            </Button>
        </div>
    );
}

export default DeleteForm