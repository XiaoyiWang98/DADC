import React, {Component} from 'react';

import {Button, Modal, message, DatePicker} from "antd";

import MapComposite from "./map/MapComposite";

import {API_ROOT} from "../../constants";


class NgoNewDonations extends Component {
    constructor() {
        super();
        const now = new Date();
        this.state = {
            pickupDate: null,
            // TODO: change list info and center to this.props, also check the names, this list is only for test and should be deleted
            // TODO: add whether you have already get a schedule
            pickUpList: [],
            selected: [],
            center: { lat: 37.351288, lng: -121.967793 },
            visibleModal: false,
            errorMessage: ""
        }

        // render fake list
        const item = {
            itemId: 0,
            status: "pending",
            post_date: "2020-08-14",
            lat: 37.373288,
            lng: -121.967793,
            name: "name",
            address: {
                address: "1 Infinite Loop",
                city: "Cupertino",
                state: "CA",
                zip: 95014
            },
            description: "blah blah blah blh.",
            image_link: "https://www.nindelivers.com/wp-content/uploads/2019/05/parcel-package.jpeg"
        }

        var i;
        var xd = 0.00, yd = 0.007;
        for(i = 0; i<25; i++){
            if( i%5 == 0){
                xd = -0.007
                yd = - yd
            }else{
                xd = 0
            }
            item.itemId = i
            item.lat += xd
            item.lng += yd
            item.name = "name " + i.toString()
            this.setState({pickUpList: this.state.pickUpList.push(Object.assign({}, item))})
        }
    }

    render() {
        return (
            <div className="ngo-new-donations">
                <div className="ngo-nd-title">New Donations</div>
                <div className="ngo-nd-date">
                    <DatePicker onChange={this.onChangeDate}/>
                </div>
                <div className="ngo-nd-schedule">
                    <Button
                        className="ngo-nd-button"
                        onClick={this.schedulePickup}
                        size="large"
                    >Schedule Pickup</Button>
                </div>
                <div className="ngo-nd-map">
                    <MapComposite
                        items = {this.state.pickUpList}
                        center = {this.state.center}
                        handleCheckedFunction = {this.handleChecked}
                    />
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

    handleChecked = (id, check) => {
        this.setState({
            errorMessage: ""
        })
        if (check && this.state.selected.indexOf(id) === -1) {
            this.setState((state) => {
                state.selected.push(id);
                return state;
            })
        }else{
            this.setState(this.setState((state) => {
                state.selected.splice(state.selected.indexOf(id),1);
                return state;
            }))
        }
        // console.log(this.state.selected);
    }

    onChangeDate = (value) => {
        if (value === null) {
            this.setState({
                pickupDate: null
            });
            return;
        }
        const date = value._d;
        this.setState(() => ({
            pickupDate: {
                year: date.getFullYear(),
                month: date.getMonth(),
                date: date.getDate()
            },
            errorMessage: ""
        }))
    }

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
        else if (this.state.pickupDate === null) {
            this.setState({
                errorMessage: "Please select the pickup date!"
            })
        }
        else if (!this.compareDate(this.state.pickupDate)) {
            this.setState({
                errorMessage: "Please select the date after today!"
            })
        }
        this.showModal();
    }

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

    showModal = () => {
        this.setState({
            visibleModal: true,
        });
    };

    handleOk = e => {
        // console.log(e);
        // console.log("Pickup information:\nDate: ", this.state.pickupDate, "\nItems: ", this.state.selected);
        this.setState({
            visibleModal: false,
        });

        const {pickupDate} = this.state;
        // const pickups = [];
        // var i;
        // for (i in this.state.selected) {
        //     pickups.push(this.state.pickUpList[i].itemId);
        // }

        const formdata = new FormData();
        formdata.set("ScheduleDate", `${pickupDate.year}-${pickupDate.month < 10 ? 0 : ''}${pickupDate.month}-${pickupDate.date < 10 ? 0 : ''}${pickupDate.date}`);
        formdata.set("ItemIds", this.state.selected);

        console.log(formdata.get("ScheduleDate"));
        console.log(formdata.get("ItemIds"));

        fetch(`${API_ROOT}/ngo/new_schedule`, {
            method: 'POST',
            body: formdata
        })
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    message.success({
                        content: "You have scheduled your next route successfully!"
                    });
                } else {
                    message.error('Failed to schedule pickups.');
                    throw new Error('Failed to schedule pickups.');
                }
            })
            .catch(error => {
                console.error(e);
                message.error('Failed to schedule pickups.');
            })
    };

    handleCancel = e => {
        // console.log(e);
        // console.log("cancelled");
        this.setState({
            visibleModal: false,
        });
    };
}

export default NgoNewDonations;