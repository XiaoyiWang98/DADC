import React, { Component } from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

class TopBar extends Component {
  render() {
    return (
      <header className="App-header">
        <div className="header-container">
          <img src={logo} className="App-logo" />
          {this.props.isLoggedIn ? (
            <span>
              <a className="Login link" onClick={this.props.handleLogout}>
                Sign out
              </a>
            </span>
          ) : (
            <span>
              {this.props.initState ? (
                <span>
                  {/*{this.props.state ?*/}
                  {/*    <span>*/}
                  {/*        <a className="NGO" aria-disabled={"true"} style={{color: "blue"}}>*/}
                  {/*        NGO </a> | <a className="Donor" onClick={this.props.switchToDonor}>*/}
                  {/*        Donor </a>*/}
                  {/*    </span> :*/}
                  {/*    <span>*/}
                  {/*        <a className="NGO" onClick={this.props.switchToNGO}>*/}
                  {/*            NGO </a> |*/}
                  {/*        <a className="Donor" style={{color: "blue"}} aria-disabled={"true"}>*/}
                  {/*        Donor </a>*/}
                  {/*    </span>*/}
                  {/*}*/}
                </span>
              ) : (
                <span className="Login">
                  {/* <a className="Login" onClick={this.props.afterInit}>
                                    Login </a> */}
                  Already have an account?
                  <Link className="link" to="/" onClick={this.props.afterInit}>
                    Sign in
                  </Link>
                </span>
              )}
            </span>
          )}
        </div>
      </header>
    );
  }
}

export default TopBar;
