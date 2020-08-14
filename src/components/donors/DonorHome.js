import React, {Component} from 'react';
import {Tabs} from 'antd';
import {API_ROOT} from '../../constants';

const {TabPane} = Tabs;

class DonorHome extends Component {
    state = {
        user_id: this.props.session.idToken.payload["cognito:username"],
        NGO: this.props.session.idToken.payload["custom:custom:NGO"],
        address: this.props.session.idToken.payload["address"].formatted,
        lastName: this.props.session.idToken.payload["family_name"],
        firstName: this.props.session.idToken.payload["given_name"],
        phoneNumber: this.props.session.idToken.payload["phone_number"],
        isLoadingItems: false,
        error: '',
        donorItems: []
    }

    componentDidMount() {
        console.log(this.state.firstName);
        console.log(this.state.lastName);
        console.log(this.state.user_id);
        console.log(this.state.NGO);
        console.log(this.state.address);
        console.log(this.state.phoneNumber);
        // fetch data and setState here donorItems = []
        // api get /donor/my_item
        // the API_ROOT and exact headers need to be modified later
        this.setState({ isLoadingItems: true, error: '' });
        fetch(`${API_ROOT}/donor/my_item`, {
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
                this.setState({donorItems: data ? data : [], isLoadingItems: false});
            })
            .catch((e) => {
                console.error(e);
                this.setState({isLoadingItems: false, error: e.message});
            })

    }

    renderHome = () => {
        return (
            <div className="home-tab">
                <h1>Hi, {this.state.firstName} {this.state.lastName}!
                    <br/>Make your donations today!</h1>
            </div>)
    }

    renderProfile = () => {
        return (
            <h2>Hi, {this.state.firstName} {this.state.lastName}!
                <br/>This is a donor profile page</h2>)
    }

    renderHistory = () => {
        return (
            <h2>Hi, {this.state.firstName} {this.state.lastName}!
                <br/>This is a donor history page</h2>)
    }

    renderDonateNow = () => {
        return (
            <h2>Hi, {this.state.firstName} {this.state.lastName}!
                <br/>This is a donor donate now page</h2>)
    }

    render() {
        return (
            <div>
                <Tabs tabPosition="left" className="tabs">
                    <TabPane tab="Home" key="1" className="home-tab">
                        {this.renderHome()}
                    </TabPane>
                    <TabPane tab="Profile" key="2">
                        {this.renderProfile()}
                    </TabPane>
                    <TabPane tab="History" key="3">
                        {this.renderHistory()}
                    </TabPane>
                    <TabPane tab="Donate Now!" key="4">
                        {this.renderDonateNow()}
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default DonorHome;