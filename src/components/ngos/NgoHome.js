import React, {Component} from 'react';
import {Tabs} from "antd";

import NgoNewDonations from "./NgoNewDonations";
import NgoHistory from "../history/NgoHistory";
import {NGO_PROCESSED_SCHEDULES, NGO_SCHEDULES} from "../history/dummy_history"; // TODO: Replace me!

const {TabPane} = Tabs;

class NgoHome extends Component {

    state = {
        user_id: this.props.session.idToken.payload["cognito:username"],
        NGO: this.props.session.idToken.payload["custom:custom:NGO"],
        address: this.props.session.idToken.payload["address"].formatted,
        lastName: this.props.session.idToken.payload["family_name"],
        firstName: this.props.session.idToken.payload["given_name"],
        phoneNumber:this.props.session.idToken.payload["phone_number"],
        isLoadingPickupList: false
    }

    componentDidMount() {
        console.log("NgoHome state -> ", this.state);
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
        return <NgoNewDonations/>;
    }

    renderHistory = () => {
        // TODO: Make http request to fetch pickup list here!
        return (
            <NgoHistory past_pickups={NGO_PROCESSED_SCHEDULES}
                        isLoad={this.state.isLoadingPickupList}/>
        )
    }

    render() {
        return (
            <div>
                <Tabs tabPosition="left">
                    <TabPane tab="Home" key="1">
                        {this.renderHome()}
                    </TabPane>
                    <TabPane tab="Profile" key="2">
                        {this.renderProfile()}
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