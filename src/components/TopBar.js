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
                    </span> :
                    <span>
                        {this.props.initState?
                            <span>
                                {this.props.state ?
                                    <span>
                                        <a className="NGO" aria-disabled={"true"} style={{color: "blue"}}>
                                        NGO </a> | <a className="Donor" onClick={this.props.switchToDonor}>
                                        Donor </a>
                                    </span> :
                                    <span>
                                        <a className="NGO" onClick={this.props.switchToNGO}>
                                            NGO </a> |
                                        <a className="Donor" style={{color: "blue"}} aria-disabled={"true"}>
                                        Donor </a>
                                    </span>
                                }
                            </span>:<span>
                                <a className="Login" onClick={this.props.afterInit}>
                                    Login </a>
                            </span>
                        }
                    </span> }
            </header>
        );
    }
}

export default TopBar;