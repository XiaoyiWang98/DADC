import React, { Component } from "react";
import { Icon, Nav, Sidenav } from "rsuite";
import { Link, Redirect } from "react-router-dom";

class DonorNavbar extends Component {
  render() {
    return (
      <div className="navbar">
        <Sidenav activeKey="1">
          <Sidenav.Body>
            <Nav>
              <Link to="/donors/home">
                <Nav.Item eventKey="1">Summery</Nav.Item>
              </Link>
              <Link to="/donors/profile">
                <Nav.Item eventKey="2">Profile</Nav.Item>
              </Link>
              <Link to="/donors/completed_pickup">
                <Nav.Item eventKey="3">History</Nav.Item>
              </Link>
              <Link to="/donors/Donate">
                <Nav.Item eventKey="4">Donate now</Nav.Item>
              </Link>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
    );
  }
}

export default DonorNavbar;
