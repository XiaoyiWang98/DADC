import React, {Component} from 'react';
import logo from "../assets/images/logo.svg";
import avatar from "../assets/images/avatar.svg";

class TopBar extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo"/>
                <span className="App-title">D&DC</span>
                {this.props.isLoggedIn ?
                    <span>
                        <img src={avatar} className="Avatar"/>
                        <a className="logout" onClick={this.props.handleLogout}>
                        Logout </a>
                    </span> : null}
            </header>
        );
    }
}

export default TopBar;