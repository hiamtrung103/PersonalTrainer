import React, {Component} from 'react';
import SkyLight from 'react-skylight';

class AddTraining extends Component {

    constructor(props) {
        super(props);
        this.state = {activity: '',
            duration: '',
            date: '',
            time: '',
            customer: this.props.customer._original.links[1].href};
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
        const newTraining = {
            activity: this.state.activity,
            duration: this.state.duration,
            date: this.state.date+'T'+this.state.time+':00.000+0000',
            customer: this.state.customer
        };
        this.props.addTraining(newTraining);
        this.simpleDialog.hide();
    }


    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Add a new training">
                    <div className="form-group">
                        <label for="activity" className="control-label">Activity name</label>
                        <input placeholder="Activity" className="form-control" name="activity" onChange={this.handleChange}/>
                    </div>
                    <div className="form-inline">
                        <div className="form-group">
                            <input placeholder="Date" className="form-control" name="date" type="text" placeholder="YYYY-MM-DD" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input placeholder="Time" className="form-control" name="time" type="text" placeholder="hh:mm" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input placeholder="Duration" className="form-control" name="duration" type="text" placeholder="Duration in minutes" onChange={this.handleChange}/>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                </SkyLight>
                <button className="btn btn-primary" onClick={() => this.simpleDialog.show()}>Add Training</button>
            </div>
    )
    }

}

export default AddTraining;