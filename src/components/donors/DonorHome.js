import React, {Component} from 'react';
import {Tabs} from 'antd';
import {API_ROOT} from '../../constants';

import DonorHistorySection from "./history/DonorHistorySection";
import { DONATED_ITEMS } from "../../tests/dummy_history";

const {TabPane} = Tabs;

class DonorHome extends Component {
    state = {
        user_id: this.props.info.user_id,
        email: this.props.info.email,
        address: this.props.info.address,
        NGO:this.props.info.NGO,
        lastName: this.props.info.lastName,
        firstName: this.props.info.firstName,
        phoneNumber:this.props.info.phoneNumber,
        city:this.props.info.city,
        state:this.props.info.state,
        postal:this.props.info.postal,
        isLoadingHistory: false,
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
        const donorItems = this.state.donorItems;
        const pendingItems = donorItems.filter(item => item.status === "pending");
        const pendingItemCount = pendingItems.length;
        return (
            <div className="home-tab">
                <h1>Hi, {this.state.firstName} {this.state.lastName}!
                    <br/>You have {pendingItemCount} unscheduled donations!
                    <br/>Make your donations today!</h1>
            </div>)
    }

    renderProfile = () => {
        return (
            <h2>Hi, {this.state.firstName} {this.state.lastName}!
                <br/>This is a donor profile page</h2>)
    }

    renderHistory = () => {
        // TODO: get donation history list via HTTP req!
        return (
            <DonorHistorySection full_history={DONATED_ITEMS}
                                 isLoad={this.state.isLoadingHistory}/>
        )
    }

    renderDonateNow = () => {
        return (
            <h2>Hi, {this.state.firstName} {this.state.lastName}!
                <br/>This is a donor donate now page</h2>)
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


    render() {
        return (
            <div>
                {this.renderHome()};
            </div>
        );
    }
}

export default DonorHome;