import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import {Home} from "./home";
import Login from "./login";
import SignUp from "./signup";

//Altered code from lessons to fit this project

export class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            ratingCount: 0
        };
    }

    updateLoggedInUserId = (userId) => {
        this.setState({userId: userId});
    };

    /*
    updateLoggedInUserRatingCount = (ratingCount) => {
        this.setState({ratingCount: ratingCount});
    };
    */

    notFound() {
        return (
            <div>
                <h2>NOT FOUND: 404</h2>
                <p>
                    ERROR: the page you requested in not available.
                </p>
            </div>
        );
    };

    render() {

        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/login"
                               render={props => <Login {...props}
                                                       userId={this.state.userId}
                                                       //ratingCount={this.state.ratingCount}
                                                       updateLoggedInUserId = {this.updateLoggedInUserId}
                                                       //updateLoggedInUserRatingCount = {this.updateLoggedInUserRatingCount}
                               />}/>
                        <Route exact path="/signup"
                               render={props => <SignUp {...props}
                                                        userId={this.state.userId}
                                                        //ratingCount={this.state.ratingCount}
                                                        updateLoggedInUserId = {this.updateLoggedInUserId}
                                                        //updateLoggedInUserRatingCount = {this.updateLoggedInUserRatingCount}
                               />}/>
                        <Route exact path="/"
                               render={props => <Home {...props}
                                                      userId={this.state.userId}
                                                      //ratingCount={this.state.ratingCount}
                                                      updateLoggedInUserId = {this.updateLoggedInUserId}
                                                      //updateLoggedInUserRatingCount = {this.updateLoggedInUserRatingCount}
                               />}/>
                        <Route component={this.notFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}


ReactDOM.render(<App/>, document.getElementById("root"));
