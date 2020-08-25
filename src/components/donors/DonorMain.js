import React, {Component} from 'react';
import TopBar from "../TopBar"
import {API_ROOT} from "../../constants"
import {Redirect, Route, Switch} from "react-router-dom"
import Login from "../auth/Login"
import DonorHome from "../donors/DonorHome"
import UserProfile from "../users/UserProfile"
import {Register} from "../auth/Register"
import {DONATED_ITEMS, NGO_PROCESSED_SCHEDULES} from "../../tests/dummy_history"
import MapCompositeTestLoader from "../ngos/map/MapCompositeTestLoader"
import DonorNavbar from "./DonorNavbar"
import DonorHistorySection from "./history/DonorHistorySection"
import {Donate} from "./Donate"

class DonorMain extends Component {

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
        fetch(`${API_ROOT}/donor/search_item`, {
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
            ? <Redirect to="/donors/home"/>
            : <Login handleLoginSucceed={this.props.handleLoginSucceed}/>;
    }

    getHome = () => {
        return this.props.isLoggedIn
            ? <DonorHome session={this.props.session}
                       handleLogout={this.props.handleLogout}
                       firstName={this.state.firstName}
                       lastName={this.state.lastName}
                       donationCount={this.state.NgoItems.length}
            />
            : <Redirect to="/" />
    }

    getProfile = () => {
        return this.props.isLoggedIn
            //? <UserProfile session={this.props.session} handleLogout={this.props.handleLogout}/>
            ? <UserProfile info={this.state} updateInfo={this.updateInfo}/>
            : <Redirect to="/"/>
    }

    getRegister = () => {
        return this.props.isLoggedIn
            ? <Redirect to="/donors/home"/>
            : <Register handleLogout={this.props.handleLogout}/>;
    }

    getHistory = () => {
        // TODO: Add axios.get to get history from backend
        return this.props.isLoggedIn
            ? <DonorHistorySection full_history={DONATED_ITEMS}
                                 isLoad={this.state.isLoadingHistory}/>
            : <Redirect to="/"/>
    }

    getDonate = () => {
        return this.props.isLoggedIn
            ? <Donate session={this.props.session}/>
            : <Redirect to="/"/>
    }

    render() {
        return (
            <div className="donor-main">
                <TopBar handleLogout={this.props.handleLogout} isLoggedIn={this.props.isLoggedIn}/>
                <div className="main">
                    <DonorNavbar className="navbar"/>
                    <div className="switch">
                        <Switch>
                            <Route exact path="/register" render={this.getRegister}/>
                            <Route exact path="/" render={this.getLogin}/>
                            <Route exact path="/donors/home" render={this.getHome}/>
                            <Route exact path="/donors/profile" component={this.getProfile} />
                            <Route exact path="/donors/completed_pickup" render={this.getHistory} />
                            <Route exact path="/donors/donate" component={this.getDonate}/>
                        </Switch>
                    </div>
                </div>

            </div>
        );
    }

}

export default DonorMain;