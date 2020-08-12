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

    render() {
        return (
            <div>
                HelloWorld
                <br/>
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }
}

export default UserProfile;