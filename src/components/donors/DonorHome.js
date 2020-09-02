import React, {Component} from 'react';
import {API_ROOT, AUTH_HEADER} from '../../constants';
import {Link} from "react-router-dom";
import {Button} from "antd";

class DonorHome extends Component {
    state = {
        lastName: this.props.session.idToken.payload["family_name"],
        firstName: this.props.session.idToken.payload["given_name"],
        isLoadingItems: false,
        error: '',
        donorItems: []
    }

    componentDidMount() {
        this.setState({ isLoadingItems: true, error: '' });
        fetch(`${API_ROOT}/donor/my_item`, {
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
                    this.setState({donorItems: data ? data : [], isLoadingItems: false});
                    this.props.collectMyItem(data);
                }
            })
            .catch((e) => {
                console.error(e);
                this.setState({isLoadingItems: false, error: e.message});
            })

    }


    render() {
        const donorItems = this.state.donorItems;
        const pendingItems = donorItems.filter(item => item.status === 1);
        const pendingItemCount = pendingItems.length;
        let donorHomeContent;
        if (pendingItemCount ===0) {
            donorHomeContent = <div className="home-tab">
                <h1>Hi, {this.state.firstName} {this.state.lastName}!
                    <br/>You have {pendingItemCount} unscheduled donations!
                    <br/>Make your donations today!</h1>
                <Button className="button-home-tab" ><Link to="/donors/donate">Click here to donate -></Link></Button>
            </div>
        } else {
            donorHomeContent = <div className="home-tab">
                <h1>Hi, {this.state.firstName} {this.state.lastName}!
                    <br/>You have {pendingItemCount} unscheduled donations!</h1>
                <Button className="button-home-tab" ><Link to="/donors/completed_pickup">Click here to view -></Link></Button>
            </div>
        }
        return (
            <div>
                {donorHomeContent}
            </div>
        )
    }
}

export default DonorHome;