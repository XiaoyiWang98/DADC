import React, {Component} from 'react';
import {Tabs} from "antd";
import UserProfile from '../users/UserProfile';

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
    }

    componentDidMount() {
        console.log(this.state.firstName);
        console.log(this.state.lastName);
        console.log(this.state.user_id);
        console.log(this.state.NGO);
        console.log(this.state.address);
        console.log(this.state.phoneNumber);

    }
    renderHome = () => {
        return (
            <h2>Hi, {this.state.firstName} {this.state.lastName}!
                <br/>This is a NGO home page</h2>)
    }

    renderProfile = () => {
        return (
            <h2>Hi, {this.state.firstName} {this.state.lastName}!
                <br/>This is a NGO profile page</h2>)
    }

    renderNewDonations = () => {
        return (
            <h2>Hi, {this.state.firstName} {this.state.lastName}!
                <br/>This is a NGO new donations page</h2>)
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