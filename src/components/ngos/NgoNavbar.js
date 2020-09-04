import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon, Nav, Sidenav } from "rsuite";

class NgoNavbar extends Component {
  // TODO: This side bar is on top of the page... Change style to move it to the LEFT!
  render() {
    return (
      <div className="navbar">
        <Sidenav activeKey="1">
          <Sidenav.Body>
            <Nav>
              {/*<Nav.Item eventKey="1" icon={<Icon icon="home" />}>*/}
              {/*    <Link to="/ngo/home">Home</Link>*/}
              {/*</Nav.Item>*/}
              {/*<Nav.Item eventKey="2" icon={<Icon icon="group" />}>*/}
              {/*  <Link to="/ngo/profile">Profile</Link>*/}
              {/*</Nav.Item>*/}
              {/*<Nav.Item eventKey="3" icon={<Icon icon="gift" />}>*/}
              {/*  <Link to="/ngo/new_donation">New Donations</Link>*/}
              {/*</Nav.Item>*/}
              {/*<Nav.Item eventKey="4" icon={<Icon icon="history" />}>*/}
              {/*  <Link to="/ngo/completed_pickup">History</Link>*/}
              {/*</Nav.Item>*/}
              <Link to="/ngo/home">
                <Nav.Item eventKey="1">Summery</Nav.Item>
              </Link>
              <Link to="/ngo/profile">
                <Nav.Item eventKey="2">Profile</Nav.Item>
              </Link>
              <Link to="/ngo/new_donation">
                <Nav.Item eventKey="3">New Donations</Nav.Item>
              </Link>
              <Link to="/ngo/completed_pickup">
                <Nav.Item eventKey="4">History</Nav.Item>
              </Link>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
    );
  }
}

export default NgoNavbar;
