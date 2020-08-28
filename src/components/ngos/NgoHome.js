import React, {Component} from 'react';
import {Button, Tabs} from "antd";
import {API_ROOT, AUTH_HEADER} from '../../constants';
import {Link} from "react-router-dom";


class NgoHome extends Component {

    state = {
        lastName: this.props.session.idToken.payload["family_name"],
        firstName: this.props.session.idToken.payload["given_name"],
        isLoadingItems: false,
        error: '',
        NgoItems: []
    }

    componentDidMount() {
        // fetch data and setState here NgoItems = []
        // api get /ngo/search_item
        // the API_ROOT need to be modified later
        this.setState({ isLoadingItems: true, error: '' });
        fetch(`${API_ROOT}/ngo/search_item`, {
            method: 'GET',
            headers: {
                Authorization: `${AUTH_HEADER} ${this.props.session.idToken.jwtToken}`
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

    render() {
        const donationCount = this.state.NgoItems.length;
        const {firstName, lastName} = this.state;
        return (
            <div className="home-tab">
                <h1>Hi, {this.state.firstName} {this.state.lastName}!
                    <br/>There are {donationCount} donations around you!</h1>
                <Button className="button-home-tab" ><Link to="/ngo/new_donation">Click here to view -></Link></Button>
            </div>)
    }

}

export default NgoHome;