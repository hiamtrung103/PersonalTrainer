import React, {Component} from 'react';
import SkyLight from 'react-skylight';

class AddCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''};
    }

    //Change of data in input
    handleChange = (event) => {
        this.setState ({
            [event.target.name]: event.target.value
        })
    }

    //Submission of data
    handleSubmit = (event) => {
        event.preventDefault();
        const newCustomer = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            streetaddress: this.state.streetaddress,
            postcode: this.state.postcode,
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phone
        };
        this.props.addCustomer(newCustomer);
        this.simpleDialog.hide();
    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Add a new customer">
                    <form>
                        <div className="form-group">
                            <input placeholder="Name" className="form-control" name="firstname" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input placeholder="Surname" className="form-control" name="lastname" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input placeholder="Address" className="form-control" name="streetaddress" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input placeholder="Postal code" className="form-control" name="postcode" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input placeholder="City" className="form-control" name="city" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input placeholder="E-mail" className="form-control" name="email" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input placeholder="Phone number" className="form-control" name="phone" onChange={this.handleChange}/>
                        </div>
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                    </form>
                </SkyLight>
                <button className="btn btn-primary" onClick={() => this.simpleDialog.show()}>Add customer</button>
            </div>
    )
    }
}

export default AddCustomer;
