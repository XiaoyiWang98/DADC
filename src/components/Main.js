import React, {Component} from 'react';
import Login from "./auth/Login";
import {Register} from "./auth/Register";
import { Switch, Route, Redirect } from 'react-router-dom';
import UserProfile from "./users/UserProfile";

class Main extends Component {

    getLogin = () => {
        return this.props.isLoggedIn
            ? <Redirect to = "/profile"/>
            : <Login handleLoginSuccessed={this.props.handleLoginSucceed}/>;
    }

    getProfile = () =>{
        return this.props.isLoggedIn
            ? <UserProfile session={this.props.session} handleLogout={this.props.handleLogout}/>
            : <Redirect to = "/"/>
    }

    getRegister = () =>{
        return this.props.isLoggedIn
            ? <Redirect to = "/profile"/>
            : <Register handleLogout={this.props.handleLogout}/>;
    }

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/register" render={this.getRegister}/>
                    <Route exact path="/" render={this.getLogin}/>
                    <Route exact path="/profile" render={this.getProfile}/>
                </Switch>
            </div>
        );
    }

}

export default Main;