import React, { Component } from 'react';
import './App.css';

//Importing react-router
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

//Importing firebase
import { firebaseAuth } from './config';

//importing components
import Calendar from './components/Calendar';
import CustomerTable from './components/CustomerTable';
import Navigator from './components/Navigator';
import Login from './components/Login';

const PrivateRoute = ({ component: Component, ...rest, isAuthenticated }) => (
    <Route {...rest} render={props => (
    isAuthenticated ? (
        <Component {...props}/>
) : (
<Redirect to={{
    pathname: '/login',
        state: { from: props.location }
}}/>
)
)}/>
)

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {user: null, isAuthenticated : false};
    }

    componentDidMount() {
        firebaseAuth().onAuthStateChanged((user) => {
            if (user && user.emailVerified) {
                this.setState({ user: user, isAuthenticated: true });
            }
            else {
                this.setState({ user: null, isAuthenticated: false });
            }
        });
    }

  render() {

    return (

        <div className="App">
          <BrowserRouter>
            <div>
                <Navigator isAuthenticated={this.state.isAuthenticated} />
                <Switch>
                    <Route path="/login" component={Login} />
                    <PrivateRoute isAuthenticated={this.state.isAuthenticated} exact path="/" component={CustomerTable} />
                    <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/customers" component={CustomerTable} />
                    <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/calendar" component={Calendar} />
                </Switch>
            </div>
            </BrowserRouter>
        </div>

    );

  }
}

export default App;
