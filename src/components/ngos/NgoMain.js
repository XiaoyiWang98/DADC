import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import Login from "../auth/Login";
import NgoHome from "./NgoHome";
import {Register} from "../auth/Register";
import MapCompositeTestLoader from "./map/MapCompositeTestLoader";
import TopBar from "../TopBar";
import NgoNavbar from "./NgoNavbar";
import NgoHistorySection from "./history/NgoHistorySection";
import UserProfile from "../users/UserProfile";
import {API_ROOT} from "../../constants";
import {NGO_PROCESSED_SCHEDULES} from "../../tests/dummy_history";
import NgoNewDonations from "./NgoNewDonations";

class NgoMain extends Component {

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
        isLoadingPickupList: false,
        email:this.props.session.idToken.payload["email"],
        isLoadingItems: false,
        error: '',
        NgoItems: []
    }

    componentDidMount() {
        console.log(this.state);
        // TODO: Check if fetch() is async. Consider using axios.get()
        // fetch data and setState here NgoItems = []
        // api get /ngo/search_item
        // the API_ROOT and exact headers need to be modified later
        this.setState({ isLoadingItems: true, error: '' });
        fetch(`${API_ROOT}/ngo/search_item`, {
            method: 'GET',
            headers: {
                Authorization: `${this.props.session.idToken}`
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error('Failed to load donorItems');
            })
            .then((data) => {
                this.setState({NgoItems: data ? data : [], isLoadingItems: false});
            })
            .catch((e) => {
                console.error(e);
                this.setState({isLoadingItems: false, error: e.message});
            });
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

    getHome = () => {
        return this.props.isLoggedIn
            ? <NgoHome session={this.props.session}
                       handleLogout={this.props.handleLogout}
                       firstName={this.state.firstName}
                       lastName={this.state.lastName}
                       donationCount={this.state.NgoItems.length}
            />
            : <Redirect to={"/"} />
    }

    getProfile = () => {
        return this.props.isLoggedIn
            //? <UserProfile session={this.props.session} handleLogout={this.props.handleLogout}/>
            ? <UserProfile info={this.state} updateInfo={this.updateInfo}/>
            : <Redirect to="/"/>
    }

    getNewDonation = () => {
        return this.props.isLoggedIn
            //? <UserProfile session={this.props.session} handleLogout={this.props.handleLogout}/>
            ? <NgoNewDonations />
            : <Redirect to="/"/>
    }

    getRegister = () => {
        return this.props.isLoggedIn
            ? <Redirect to="/ngo/home"/>
            : <Register handleLogout={this.props.handleLogout}/>;
    }

    getHistory = () => {
        // TODO: Add axios.get to get history from backend
        return this.props.isLoggedIn
            ? <NgoHistorySection full_history={NGO_PROCESSED_SCHEDULES}
                                 isLoad={this.state.isLoadingPickupList}/>
            : <Redirect to="/"/>
    }

    render() {
        return (
            <div className="ngo-main">
                <TopBar handleLogout={this.props.handleLogout} isLoggedIn={this.props.isLoggedIn}/>
                <div className="content">
                <NgoNavbar />
                <Switch>
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
        );
    }
}

export default NgoMain;