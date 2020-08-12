import React, {Component} from 'react';
import Pool from "../auth/UserPool";

class UserProfile extends Component {
    logout = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
            this.props.handleLogout();
        }
    }

    state = {
        user_id: this.props.session.idToken.payload["cognito:username"],
        NGO: this.props.session.idToken.payload["custom:custom:NGO"],
        address: this.props.session.idToken.payload["address"].formatted,
        lastName: this.props.session.idToken.payload["family_name"],
        firstName: this.props.session.idToken.payload["given_name"],
        phoneNumber:this.props.session.idToken.payload["phone_number"]
    }

    componentDidMount() {
        console.log(this.state.firstName);
        console.log(this.state.lastName);
        console.log(this.state.user_id);
        console.log(this.state.NGO);
        console.log(this.state.address);
        console.log(this.state.phoneNumber);

    }


    render() {
        var NGO_label;
        if (this.state.NGO === 1) {
            NGO_label = null;
        } else {
            NGO_label = "not";
        }
        return (
            <div>
                <h2>Hello, {this.state.firstName} {this.state.lastName}</h2>
                <p>Your user id is {this.state.user_id}</p>
                <p>You are {NGO_label} a NGO member</p>
                <p>Your phone number is {this.state.phoneNumber}</p>
                <p>Your Address is: {this.state.address}</p>
                <br/>
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }
}

export default UserProfile;