import React, {Component} from 'react';
import TopBar from "../TopBar"
import {API_ROOT, AUTH_HEADER} from "../../constants"
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
        token:this.props.session.idToken.jwtToken,
        isLoadingPickupList: false,
        email:this.props.session.idToken.payload["email"],
        isLoadingItems: false,
        error: '',
        donorItems: [],
        donateSuccess: false,
    }

    componentDidMount() {
        console.log(this.state);
        // TODO: Check if fetch() is async. Consider using axios.get()
        // fetch data and setState here NgoItems = []
        // api get /ngo/search_item
        // the API_ROOT and exact headers need to be modified later
        // this.setState({ isLoadingItems: true, error: '' });
        // fetch(`${API_ROOT}/donor/my_item`, {
        //     method: 'GET',
        //     headers: {
        //         Authorization: `${AUTH_HEADER} ${this.props.session.idToken.jwtToken}`
        //     }
        // })
        //     .then((response) => {
        //         if (response.status === 200) {
        //             return response.json();
        //         }
        //         throw new Error('Failed to load donorItems');
        //     })
        //     .then((data) => {
        //         this.setState({donorItems: data ? data : [], isLoadingItems: false});
        //     })
        //     .catch((e) => {
        //         console.error(e);
        //         this.setState({isLoadingItems: false, error: e.message});
        //     })
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

    collectMyItem = (data) => {
        this.setState({
            donorItems: data
        })
    }

    getHome = () => {
        return this.props.isLoggedIn
            ? <DonorHome info={this.state} collectMyItem = {this.collectMyItem}
            />
            : <Redirect to="/donors/home" />
    }

    getProfile = () => {
        return this.props.isLoggedIn
            //? <UserProfile session={this.props.session} handleLogout={this.props.handleLogout}/>
            ? <UserProfile info={this.state} updateInfo={this.updateInfo}/>
            : <Redirect to="/donors/home"/>
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
                                 isLoad={this.state.isLoadingHistory}
                                 info={this.state} updateInfo={this.updateInfo}/>
            : <Redirect to="/donors/home"/>
    }

    getDonate = () => {
        if(this.props.isLoggedIn){
            if(this.state.donateSuccess){
                return <Redirect to="/donors/home"/>
            } else {
                return <Donate info={this.state} backToHome={this.backToHome}/>
            }
        } else {
            return <Redirect to="/"/>;
        }
    }

    backToHome = () => {
        this.setState({donateSuccess: true})
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.donateSuccess){
            this.setState({donateSuccess: false});
            console.log("updated")
        }
    }

    render() {
        return (
            <div className="donor-main">
                <TopBar handleLogout={this.props.handleLogout} isLoggedIn={this.props.isLoggedIn}/>
                <div className="main">
                    <DonorNavbar />
                    <div className="switch">
                        <Switch>
                            {/* <Route exact path="/register" render={this.getRegister}/> */}
                            <Route exact path="/" render={this.getLogin}/>
                            <Route exact path="/donors/home" render={this.getHome}/>
                            <Route exact path="/donors/profile" component={this.getProfile} />
                            <Route exact path="/donors/completed_pickup" render={this.getHistory} />
                            <Route exact path="/donors/donate" render={this.getDonate}/>
                            <Route render={()=><DonorHome info={this.state} collectMyItem = {this.collectMyItem}
            />}/>
                        </Switch>
                    </div>
                </div>

            </div>
        );
    }

}

export default DonorMain;