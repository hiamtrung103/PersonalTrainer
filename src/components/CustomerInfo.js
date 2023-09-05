import React, {Component} from 'react';
import SkyLight from 'react-skylight';
import moment from 'moment';

class CustomerInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trainings: [],
            name: this.props.customer._original.firstname,
            surname: this.props.customer._original.lastname,
            trainingLink: this.props.customer._original.links[2].href,
            city: this.props.customer._original.city,
            email: this.props.customer._original.email,
            phone: this.props.customer._original.phone,
            postcode: this.props.customer._original.postcode,
            streetaddress: this.props.customer._original.streetaddress
        }

    }

    //fetch trainings
    loadTrainings = () => {
        fetch(this.state.trainingLink)
            .then(res => res.json())
            .then(resData => {
                this.setState({trainings: resData.content});
            })
    }

    //delete training
    deleteTraining = (value) => {
        fetch(value, {method: 'DELETE'})
            .then(res => {
                    this.loadTrainings()
                    alert('Training deleted')
                }
            )
    }

    componentDidMount() {
        this.loadTrainings();
    }

    render() {

        const trainingRow = this.state.trainings.map(
            (exercise) =>
            <tr key={exercise.id}>
                <td>{exercise.activity}</td>
                <td>{moment(exercise.date).format("MMM Do YYYY")}</td>
                <td>{moment(exercise.date).format('LT')}</td>
                <td>{exercise.duration}</td>
                <td><button className="btn btn-primary" onClick={() => this.deleteTraining(exercise.links[0].href)}>Delete</button></td>
            </tr>
        )

        return (
            <div>
            <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Customer info" className="container" width="100%">

            <table className="table table-condensed">
                <tbody>
                    <tr>
                        <td><b>First name:</b> {this.state.name}</td>
                        <td><b>Last name:</b> {this.state.surname}</td>
                    </tr>
                    <tr>
                        <td colspan="2"><b>Address:</b> {this.state.streetaddress}, {this.state.postcode} {this.state.city}</td>
                    </tr>
                    <tr>
                        <td><b>Tel. number:</b> {this.state.phone}</td>
                        <td><b>Email:</b> {this.state.email}</td>
                    </tr>
                </tbody>
            </table>
        <table className="table table-condensed">
            <thead>
                <tr>
                    <th>Trainings</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Duration (in min)</th>
                </tr>
            </thead>
            <tbody>
                {trainingRow}
            </tbody>
        </table>
        </SkyLight>
        <button className="btn btn-primary" onClick={() => this.simpleDialog.show()}>View info</button>
        </div>
    )
        ;
    }
}

export default CustomerInfo;

