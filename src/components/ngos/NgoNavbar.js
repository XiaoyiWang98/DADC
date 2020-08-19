import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Icon, Nav, Sidenav, Sidebar} from 'rsuite';


class NgoNavbar extends Component {

    render() {
        return (
            <div style={{width: 250, overflow: "hidden"}}>
                <Sidenav activeKey="1">
                    <Sidenav.Body>
                        <Nav>
                            <Nav.Item eventKey="1" icon={<Icon icon="home"/>}>
                                <Link to="/ngo/home">Home</Link>
                            </Nav.Item>
                            <Nav.Item eventKey="2" icon={<Icon icon="group" />}>
                                <Link to="/ngo/profile">Profile</Link>
                            </Nav.Item>
                            <Nav.Item eventKey="3" icon={<Icon icon="gift" />}>
                                <Link to="/ngo/mapTest">New Donations</Link>
                            </Nav.Item>
                            <Nav.Item eventKey="4" icon={<Icon icon="history" />}>
                                <Link to="/ngo/completed_pickup">History</Link>
                            </Nav.Item>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
        );
    }
}

export default NgoNavbar;