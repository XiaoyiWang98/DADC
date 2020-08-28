import React, {Component} from 'react';
import {API_ROOT, AUTH_HEADER} from '../../constants';

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
                this.setState({donorItems: data ? data : [], isLoadingItems: false});
            })
            .catch((e) => {
                console.error(e);
                this.setState({isLoadingItems: false, error: e.message});
            })

    }


    render() {
        const donorItems = this.state.donorItems;
        const pendingItems = donorItems.filter(item => item.status === "pending");
        const pendingItemCount = pendingItems.length;
        return (
            <div className="home-tab">
                <h1>Hi, {this.state.firstName} {this.state.lastName}!
                    <br/>You have {pendingItemCount} unscheduled donations!
                    <br/>Make your donations today!</h1>
            </div>
        )
    }
}

export default DonorHome;