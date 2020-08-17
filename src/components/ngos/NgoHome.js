import React, {Component} from 'react';
import {Tabs} from "antd";
import UserProfile from '../users/UserProfile';
import {API_ROOT} from '../../constants';
import NgoNewDonations from "./NgoNewDonations";

const {TabPane} = Tabs;

class NgoHome extends Component {

    state = {
        user_id: this.props.session.idToken.payload["cognito:username"],
        NGO: this.props.session.idToken.payload["custom:custom:NGO"],
        address: this.props.session.idToken.payload["address"].formatted,
        lastName: this.props.session.idToken.payload["family_name"],
        firstName: this.props.session.idToken.payload["given_name"],
        phoneNumber:this.props.session.idToken.payload["phone_number"],
        email:this.props.session.idToken.payload["email"]
        isLoadingItems: false,
        error: '',
        NgoItems: []
    }

    componentDidMount() {
        console.log(this.state.firstName);
        console.log(this.state.lastName);
        console.log(this.state.user_id);
        console.log(this.state.NGO);
        console.log(this.state.address);
        console.log(this.state.phoneNumber);
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
            })

    }

    renderHome = () => {
        const donationCount = this.state.NgoItems.length;
        return (
            <div className="home-tab">
                <h1>Hi, {this.state.firstName} {this.state.lastName}!
                    <br/>There are {donationCount} donations around you!</h1>
                {/*redirect destination of this button needs to be filled later*/}
                <button className="button-home-tab"><a href="#">Click here to view -></a></button>
            </div>)
    }

    renderProfile = () => {
        return (
            <h2>Hi, {this.state.firstName} {this.state.lastName}!
                <br/>This is a NGO profile page</h2>)
    }

    renderNewDonations = () => {
        return <NgoNewDonations/>;
    }

    renderHistory = () => {
        return (
            <h2>Hi, {this.state.firstName} {this.state.lastName}!
                <br/>This is a NGO history page</h2>)
    }

    render() {
        return (
            <div>
                <Tabs tabPosition="left">
                    <TabPane tab="Home" key="1">
                        {this.renderHome()}
                    </TabPane>
                    <TabPane tab="Profile" key="2">
                        <UserProfile info={this.state}/>
                    </TabPane>
                    <TabPane tab="NewDonations" key="3">
                        {this.renderNewDonations()}
                    </TabPane>
                    <TabPane tab="History" key="4">
                        {this.renderHistory()}
                    </TabPane>
                </Tabs>
            </div>
        );
    }

}

export default NgoHome;