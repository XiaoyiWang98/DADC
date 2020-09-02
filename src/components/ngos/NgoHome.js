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
                // handle the case when data is {"result": "FAILED"}
                if (data.length === undefined) {
                    throw new Error('Failed to load donorItems');
                } else {
                    this.setState({NgoItems: data ? data : [], isLoadingItems: false});
                    this.props.collectSearchItem(data);
                }
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
                <h1>Hi, {this.state.firstName}!
                    <br/>There are {donationCount} donations around you!</h1>
                <Button className="button-home-tab" ><Link to="/ngo/new_donation">Click here to view -></Link></Button>
            </div>)
    }

}

export default NgoHome;