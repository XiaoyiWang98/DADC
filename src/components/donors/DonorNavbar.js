import React, {Component} from 'react';
import {Icon, Nav, Sidenav} from "rsuite"
import {Link} from "react-router-dom"

class DonorNavbar extends Component {
    render() {
        return (
            <div style={{width: 250, overflow: "hidden"}}>
                <Sidenav activeKey="1">
                    <Sidenav.Body>
                        <Nav>
                            <Nav.Item eventKey="1" icon={<Icon icon="home"/>}>
                                <Link to="/donors/home">Home</Link>
                            </Nav.Item>
                            <Nav.Item eventKey="2" icon={<Icon icon="group" />}>
                                <Link to="/donors/profile">Profile</Link>
                            </Nav.Item>
                            <Nav.Item eventKey="3" icon={<Icon icon="history" />}>
                                <Link to="/donors/completed_pickup">History</Link>
                            </Nav.Item>
                            <Nav.Item eventKey="4" icon={<Icon icon="gift" />}>
                                <Link to="/donors/Donate">Donate now</Link>
                            </Nav.Item>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
        );
    }
}

export default DonorNavbar;