import React, {Component} from 'react';
import TopBar from "../TopBar"

class DonorMain extends Component {
    render() {
        return (
            <div className="donor-main">
                <TopBar handleLogout={this.props.handleLogout} isLoggedIn={this.props.isLoggedIn}/>
                This is Donor Main!
            </div>
        );
    }
}

export default DonorMain;