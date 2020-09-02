import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Icon, Nav, Sidenav} from 'rsuite';
import {Button} from "antd";


class NgoNavbar extends Component {
    // TODO: This side bar is on top of the page... Change style to move it to the LEFT!
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
                                <Link to="/ngo/new_donation">New Donations</Link>
                            </Nav.Item>
                            <Nav.Item eventKey="4" icon={<Icon icon="history" />}>
                                <Link to="/ngo/completed_pickup">History</Link>
                                {/*<Button onClick={}>History</Button>*/}
                            </Nav.Item>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
        );
    }
}

export default NgoNavbar;