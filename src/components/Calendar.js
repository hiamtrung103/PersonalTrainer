import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

BigCalendar.momentLocalizer(moment);

class Calendar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trainings: [],
            calevents: []
        }
    }

    //fetch the customers
    loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(res => res.json())
            .then(resData => {
                this.setState({trainings: resData.content});
            })
            .then(
                trainings => {
                    let evnts = [];
                    for (var i = 0; i < this.state.trainings.length; i++) {
                        let newEvent = {
                            id: i,
                            title: this.state.trainings[i].activity,
                            start: moment.utc(this.state.trainings[i].date)._d,
                            end: moment.utc(this.state.trainings[i].date).add(this.state.trainings[i].duration, 'minutes')._d
                        }
                        evnts.push(newEvent);
                    }

                    this.setState({
                        calevents: evnts
                    });
                    console.log(this.state.calevents);
                }
            )
    }

    componentDidMount() {
        this.loadTrainings();
    }

    render() {



        return (
            <div style={{height: 75+'vh'}}>
                <BigCalendar
            culture='en-GB'
            events={this.state.calevents}
            views={allViews}
            step={30}
            defaultDate={new Date()}
            />
        </div>
    );
    }
}

export default Calendar;
