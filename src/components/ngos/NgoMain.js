import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import TopBar from "../TopBar";
import NgoNavbar from "./NgoNavbar";
import Login from "../auth/Login";
import NgoHome from "./NgoHome";
import UserProfile from "../users/UserProfile";
import {Register} from "../auth/Register";
import MapCompositeTestLoader from "./map/MapCompositeTestLoader";
import NgoNewDonations from "./NgoNewDonations";
import NgoHistorySection from "./history/NgoHistorySection";

import {API_ROOT, AUTH_HEADER} from "../../constants";
import {NGO_PROCESSED_SCHEDULES} from "../../tests/dummy_history";
import {message} from "antd";

class NgoMain extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         user_id: this.props.session.idToken.payload["cognito:username"],
    //         NGO: this.props.session.idToken.payload["custom:custom:NGO"],
    //         address: this.props.session.idToken.payload["address"].formatted,
    //         city:this.props.session.idToken.payload["custom:city"],
    //         state:this.props.session.idToken.payload["custom:state"],
    //         postal:this.props.session.idToken.payload["custom:postalCode"],
    //         lastName: this.props.session.idToken.payload["family_name"],
    //         firstName: this.props.session.idToken.payload["given_name"],
    //         phoneNumber:this.props.session.idToken.payload["phone_number"],
    //         isLoadingPickupList: false,
    //         email:this.props.session.idToken.payload["email"],
    //         // isLoadingItems: false,
    //         // error: '',
    //         // NgoItems: []
    //         pickUpList: null
    //     }
    //
    //     this.updatePickUpList();
    // }

    state = {
        user_id: this.props.session.idToken.payload["cognito:username"],
        NGO: this.props.session.idToken.payload["custom:custom:NGO"],
        address: this.props.session.idToken.payload["address"].formatted,
        city:this.props.session.idToken.payload["custom:city"],
        state:this.props.session.idToken.payload["custom:state"],
        postal:this.props.session.idToken.payload["custom:postalCode"],
        lastName: this.props.session.idToken.payload["family_name"],
        firstName: this.props.session.idToken.payload["given_name"],
        phoneNumber:this.props.session.idToken.payload["phone_number"],
        email:this.props.session.idToken.payload["email"],
        backToHistory: false,
        NgoItems: []
    }

    // updatePickupList = () => {
    //     // console.log("updatePickupList");
    //     // console.log(`${API_ROOT}/ngo/search_item`)
    //     fetch(`${API_ROOT}/ngo/search_item`, {
    //         method: 'GET',
    //         headers: {
    //             Authorization: `${AUTH_HEADER} ${this.props.session.idToken.jwtToken}`,
    //         }
    //     })
    //         .then((response) => {
    //             console.log(response);
    //             if (response.ok) {
    //                 // console.log("good");
    //                 // console.log(response.text());
    //                 return response.json();
    //             } else {
    //                 message.error('Failed to send request.');
    //                 throw new Error('Failed to send request.');
    //             }
    //         })
    //         .then(data => {
    //             console.log(data);
    //             this.setState({
    //                 pickupList: data
    //             })
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             message.error('Error caught: Failed to get pickup list.');
    //         })
    // }

    componentDidMount() {
        console.log(this.state);
    }

    updateInfo = (e) =>{
        this.setState({
            firstName: e.firstName,
            lastName: e.lastName,
            address: e.address,
            city: e.city,
            state: e.state,
            postal: e.postal
        })
    }

    getLogin = () => {
        return this.props.isLoggedIn
            ? <Redirect to="/ngo/home"/>
            : <Login handleLoginSucceed={this.props.handleLoginSucceed}/>;
    }

    collectSearchItem = (data) => {
        this.setState({
            NgoItems: data
        })
    }

    getHome = () => {
        return this.props.isLoggedIn
            ? <NgoHome session={this.props.session} collectSearchItem = {this.collectSearchItem}
            />
            : <Redirect to="/" />
    }

    getProfile = () => {
        return this.props.isLoggedIn
            //? <UserProfile session={this.props.session} handleLogout={this.props.handleLogout}/>
            ? <UserProfile info={this.state} updateInfo={this.updateInfo}/>
            : <Redirect to="/"/>
    }

    getNewDonation = () => {
        // return this.props.isLoggedIn
        //     //? <UserProfile session={this.props.session} handleLogout={this.props.handleLogout}/>
        //     ? <NgoNewDonations session={this.props.session}
        //                        backToHistory={this.backToHistory} />
        //     : <Redirect to="/"/>
        if (this.props.isLoggedIn) {
            if (this.state.backToHistory) {
                this.setState({
                    backToHistory: false
                })
                return <Redirect to="/ngo/completed_pickup"/>
            } else {
                return <NgoNewDonations session={this.props.session}
                                        backToHistory={this.backToHistory} />
            }
        } else {
            return <Redirect to="/"/>
        }
    }

    getRegister = () => {
        return this.props.isLoggedIn
            ? <Redirect to="/ngo/home"/>
            : <Register handleLogout={this.props.handleLogout}/>;
    }

    getHistory = () => {
        let jwtToken = this.props.session.idToken.jwtToken;
        return this.props.isLoggedIn
            ? <NgoHistorySection auth_token={jwtToken}/>
            : <Redirect to="/"/>
    }

    backToHistory = () => {
        this.setState({
            backToHistory: true
        })
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     this.setState({
    //         backToHistory: false
    //     })
    // }


    render() {
        return (
            <div>
                <TopBar handleLogout={this.props.handleLogout} isLoggedIn={this.props.isLoggedIn}/>
                <div className="ngo-main">
                    <NgoNavbar className="navbar"/>
                    <div className="ngo-switch" >
                        <Switch >
                            <Route exact path="/register" render={this.getRegister}/>
                            <Route exact path="/" render={this.getLogin}/>
                            <Route exact path="/ngo/home" render={this.getHome}/>
                            <Route exact path="/ngo/profile" component={this.getProfile} />
                            <Route exact path="/ngo/mapTest" component={MapCompositeTestLoader}/>
                            <Route exact path="/ngo/new_donation" component={this.getNewDonation}/>
                            <Route exact path="/ngo/completed_pickup" render={this.getHistory} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default NgoMain;