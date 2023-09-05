import React, { Component } from 'react';

//Importing react-table
import ReactTable from "react-table";
import "react-table/react-table.css";

//Importing confirmation alert
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

//Links to other js files
import CustomerInfo from './CustomerInfo';
import AddCustomer from "./AddCustomer";
import AddTraining from './AddTraining';

class CustomerTable extends Component {


    constructor(props) {
        super(props);
        this.state = {customers: []};
    }

    //fetch the customers
    loadCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(res => res.json())
            .then(resData => {
                this.setState({customers: resData.content});
            })
    }

    // Add a new customer
    addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {method: 'POST',
                headers : {'Content-Type': 'application/json'},
                body: JSON.stringify(newCustomer)
            })
            .then(res => {
                this.loadCustomers()

            })
    }

    //Add training
    addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
            {method: 'POST',
                headers : {'Content-Type': 'application/json'},
                body: JSON.stringify(newTraining)
            })
            .then(res => {
                alert('Training added')
                this.loadCustomers()
            })
    }

    //delete customer
    deleteCustomer = (value) => {
        console.log(value)
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(value, {method: 'DELETE'})
                            .then(res => {
                                    this.loadCustomers()
                                    alert('Customer deleted')
                                }
                            )
                    }
                },
                {
                    label: 'No'
                }
            ]
        })
    }

    componentDidMount() {
        this.loadCustomers();
    }

    render() {

        return (
            <div>
            <AddCustomer addCustomer={this.addCustomer} />
        <ReactTable
        data={this.state.customers}
        columns={[
                {
                    columns: [
                        {
                            Header: "First name",
                            accessor: "firstname"
                        },
                        {
                            Header: "Last name",
                            accessor: "lastname"
                        },
                        {
                            id: 'button',
                            filterable: false,
                            sortable: false,
                            width: 100,
                            Cell: ({row}) => (<CustomerInfo customer={row} />)
                },

        {
            id: 'buttonT',
                filterable: false,
            sortable: false,
            width: 100,
            Cell: ({row}) => (<AddTraining addTraining={this.addTraining} customer={row}/>)
        },

        {
            Header: "",
                accessor: "links[0].href",
            filterable: false,
            sortable: false,
            Cell: ({value}) => (<button className="btn btn-primary" onClick={() => {this.deleteCustomer(value)}}>Delete customer</button>)
        }
    ]
    }
    ]}
        filterable
        defaultPageSize={10}
        className="-striped -highlight"
            />
            </div>
    );
    }
}

export default CustomerTable;

