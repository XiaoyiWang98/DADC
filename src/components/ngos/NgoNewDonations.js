import React, {Component} from 'react';

import {Button, Calendar, Checkbox, List, Avatar, Modal, message} from "antd";

import NgoMap from "./NgoMap";
// TODO： change logo for item list
import itemLogo from "../../assets/images/logo.svg"



class NgoNewDonations extends Component {
    constructor() {
        super();
        const now = new Date();
        this.state = {
            pickupDate: {
                year: now.getFullYear(),
                month: now.getMonth(),
                date: now.getDate()
            },
            // TODO: change list info to this.props, also check the names, this list is only for test and should be deleted
            pickUpList: [{id: 1, name: "facemask", address: "1234 M St"}, {id: 2, name: "mattress", address: "5678 S Ln"}],
            selected: [],
            visibleModal: false,
            errorMessage: ""
        }
    }

    // TODO: change map reactions in line 34
    render() {
        return (
            <div className="ngo-new-donations">
                <div className="ngo-nd-left">
                    <NgoMap
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `800px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
                <div className="ngo-nd-right">
                    <div className="ngo-nd-title">Pickup Locations</div>
                    <hr/>
                    <List
                        className="ngo-nd-list"
                        itemLayout="horizontal"
                        dataSource={this.state.pickUpList}
                        renderItem={item => (
                            <List.Item actions={[<Checkbox dataInfo={item} onChange={this.onChangeItem}/>]}>
                                <List.Item.Meta
                                    avatar={<Avatar size={50} src={itemLogo} />}
                                    title={<p>{item.name}</p>}
                                    description={<p>{item.address}</p>}
                                />
                            </List.Item>
                        )}
                    />
                    <div className="ngo-nd-title">Select Date</div>
                    <hr/>
                    <div className="ngo-nd-date">
                        <Calendar fullscreen={false} onChange={this.onChangeDate}/>
                    </div>
                    <div className="ngo-nd-schedule">
                        <Button
                            className="ngo-nd-button"
                            onClick={this.schedulePickup}
                            size="large"
                        >Schedule Pickup</Button>
                    </div>
                </div>
                <Modal
                    title="Schedule Pickup Information"
                    visible={this.state.visibleModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={this.state.errorMessage === "" ?
                        [<Button key="back" onClick={this.handleCancel}>Cancel</Button>,
                            <Button key="submit" onClick={this.handleOk}>Submit Schedule</Button>]
                            :
                        [<Button key="back" onClick={this.handleCancel}>Ok</Button>]
                    }
                >
                    {
                        this.state.errorMessage === "" ? <p>Are you confirmed to submit your next pickup schedule?</p>
                            : <p>{this.state.errorMessage}</p>
                    }
                </Modal>
            </div>
        );
    }

    onChangeDate = (value) => {
        const date = value._d;
        this.setState(() => ({
            pickupDate: {
                year: date.getFullYear(),
                month: date.getMonth(),
                date: date.getDate()
            }
        }))
    }

    // TODO: change the error message and other error cases if necessary
    schedulePickup = () => {
        if (this.state.selected.length == 0) {
            this.setState({
                errorMessage: "Please select at least 1 item!"
            })
        }
        else if (this.state.selected.length > 25) {
            this.setState({
                errorMessage: "Please select no more than 25 items!"
            })
        }
        else if (!this.compareDate(this.state.pickupDate)) {
            this.setState({
                errorMessage: "Please select the date after today!"
            })
        }
        this.showModal();
    }

    // TODO: change valid date definition if needed
    compareDate = (date) => {
        const now = new Date();
        if (date.year < now.getFullYear()) {
            return false;
        }
        if (date.year === now.getFullYear()) {
            if (date.month < now.getMonth()) {
                return false;
            }
            if (date.month === now.getMonth() && date.date <= now.getDate()) {
                return false;
            }
        }
        return true;
    }

    onChangeItem = (e) => {
        const { dataInfo, checked } = e.target;
        const { selected } = this.state;
        const list = this.addOrRemove(dataInfo, checked, selected);
        this.setState({
            selected: list
        })
    }

    addOrRemove = (item, status, list) => {
        const found = list.some(entry => entry.id === item.id);
        if (status && !found) {
            list.push(item)
        }
        if (!status && found) {
            list = list.filter(entry => {
                return entry.id !== item.id;
            });
        }
        return list;
    }

    showModal = () => {
        this.setState({
            visibleModal: true,
        });
    };

    // TODO: change the schedule function and interaction with the parent node
    handleOk = e => {
        // console.log(e);
        console.log("Pickup information:\nDate " + this.state.pickupDate + "\nItems ", this.state.selected);
        console.log("success");
        this.setState({
            visibleModal: false,
            errorMessage: ""
        });
        message.success({
            content: "You have scheduled your next route successfully!"
        });
    };

    handleCancel = e => {
        // console.log(e);
        console.log("cancelled");
        this.setState({
            visibleModal: false,
            errorMessage: ""
        });
    };
}

export default NgoNewDonations;