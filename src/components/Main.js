import React, {Component} from 'react';
import Login from "./auth/Login";
import {Register} from "./auth/Register";
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import DonorHome from "./donors/DonorHome";
import NgoHome from "./ngos/NgoHome";
import MapCompositeTestLoader from "./ngos/map/MapCompositeTestLoader";
import NgoNewDonations from "./ngos/NgoNewDonations";

class Main extends Component {

    getLogin = () => {
        return this.props.isLoggedIn
            ? <Redirect to="/home"/>
            : <Login handleLoginSuccessed={this.props.handleLoginSucceed}/>;
    }

    // getProfile = () => {
    //     return this.props.isLoggedIn
    //         ? <UserProfile session={this.props.session} handleLogout={this.props.handleLogout}/>
    //         : <Redirect to="/"/>
    // }

    getHome = () => {
        if (this.props.isLoggedIn) {
            return this.props.session.idToken.payload["custom:custom:NGO"] == 0
                ? <DonorHome session={this.props.session} handleLogout={this.props.handleLogout}/>
                : <NgoHome session={this.props.session} handleLogout={this.props.handleLogout}/>
        } else {
            return <Redirect to={"/"}/>;
        }
    }

    getRegister = () => {
        return this.props.isLoggedIn
            ? <Redirect to="/home"/>
            : <Register handleLogout={this.props.handleLogout}/>;
    }

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/register" render={this.getRegister}/>
                    <Route exact path="/" render={this.getLogin}/>
                    <Route exact path="/home" render={this.getHome}/>
                    <Route exact path="/mapTest" component={MapCompositeTestLoader}/>
                    <Route exact path="/completed_pickup" component={NgoNewDonations} />
                </Switch>
            </div>
        );
    }

}

export default Main;