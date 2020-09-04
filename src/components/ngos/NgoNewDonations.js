import React, {Component} from 'react';

import {Button, Modal, message, DatePicker, Spin} from "antd";

import MapComposite from "./map/MapComposite";

import {API_ROOT, AUTH_HEADER} from "../../constants";

import {parseItemList} from "../../Utils";


class NgoNewDonations extends Component {

    state = {
        pickupDate: null,
        pickupList: null,
        selected: [],
        center: null,
        visibleModal: false,
        errorMessage: ""
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
                    {(this.state.pickupList === null || this.state.center === null) ?
                        <Spin tip="Loading..." size="large"/>
                        :
                        <MapComposite
                            items={this.state.pickupList}
                            center={this.state.center}
                            handleCheckedFunction={this.handleChecked}
                        />
                    }
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

    updatePickupList = () => {
        // console.log("updatePickupList");
        // console.log(`${API_ROOT}/ngo/search_item`)
        fetch(`${API_ROOT}/ngo/search_item`, {
            method: 'GET',
            headers: {
                Authorization: `${AUTH_HEADER} ${this.props.session.idToken.jwtToken}`,
            }
        })
            .then((response) => {
                // console.log(response);
                if (response.ok) {
                    // console.log("good");
                    // console.log(response.text());
                    return response.json();
                } else {
                    message.error('Failed to send request.');
                    throw new Error('Failed to send request.');
                }
            })
            .then(data => {
                console.log("searched items: ", data);

                let item_list = parseItemList(data);
                this.setState({pickupList: item_list});
            })
            .catch(error => {
                console.error(error);
                message.error('Error caught: Failed to get pickup list.');
            })

        fetch("https://maps.googleapis.com/maps/api/geocode/json?address="
            + this.props.session.idToken.payload["address"].formatted.replace(' ', '+')
            + ",+"
            + this.props.session.idToken.payload["custom:city"].replace(' ', '+')
            + ",+"
            + this.props.session.idToken.payload["custom:state"]
            + "+"
            + this.props.session.idToken.payload["custom:postalCode"]
            + "&key=AIzaSyCq-BRueDRRCUgFkqTgO93mFkgBfP0hOjU",
            {
                method: 'GET'
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                message.error("Failed to get your geo location.");
            })
            .then(data => {
                // console.log(data);
                if (data.status === "OK") {
                    this.setState({
                        center: data.results[0].geometry.location
                    })
                } else {
                    message.error("Failed to get your geo location.");
                }
            })
            .catch(error => {
                message.error("Error caught: Failed to get your geo location.")
            })
    }

    componentDidMount() {
        this.updatePickupList();
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

    onChangeDate = (date, dateStr) => {
        if (date === null) {
            console.log("date is null!");
            this.setState({
                pickupDate: null
            });
            return;
        }
        this.setState({pickupDate: dateStr}, function () {
            console.log("pickup date: ", this.state.pickupDate);
        });
    }

    schedulePickup = () => {
        console.log("New Donation state: ", this.state);
        console.log(this.props.session);
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
            if (date.month < now.getMonth() + 1) {
                return false;
            }
            if (date.month === now.getMonth() + 1 && date.date <= now.getDate()) {
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

        const {pickupDate, selected} = this.state;
        // const pickups = [];
        // var i;
        // for (i in this.state.selected) {
        //     pickups.push(this.state.pickupList[i].itemId);
        // }

        // const formdata = new FormData();
        // formdata.set("ScheduleDate", `${pickupDate.year}-${pickupDate.month < 10 ? 0 : ''}${pickupDate.month}-${pickupDate.date < 10 ? 0 : ''}${pickupDate.date}`);
        // formdata.set("itemIds", this.state.selected);

        // console.log(formdata.get("ScheduleDate"));
        // console.log(formdata.get("itemIds"));
        // console.log(this.state.selected);

        const pickData = JSON.stringify({
            //"ScheduleDate": `${pickupDate.year}-${pickupDate.month < 10 ? 0 : ''}${pickupDate.month}-${pickupDate.date < 10 ? 0 : ''}${pickupDate.date}`,
            "ScheduleDate": pickupDate,
            "itemIds": selected
        })
        console.log("Submitting new pickup schedule: ", pickData);

        fetch(`${API_ROOT}/ngo/new_schedule`, {
            method: 'POST',
            headers: {
                Authorization: `${AUTH_HEADER} ${this.props.session.idToken.jwtToken}`,
            },
            body: pickData
        })
            .then((response) => {
                // console.log(response);
                if (response.ok) {
                    // message.success({
                    //     content: "You have scheduled your next route successfully!"
                    // });
                    return response.json();
                } else {
                    message.error('Failed to send request.');
                    throw new Error('Failed to send request.');
                }
            })
            .then((data) => {
                // console.log(data);
                if(data.result === "SUCCESS"){
                    message.success("You have scheduled your next route successfully!");
                    this.props.backToHistory();
                } else {
                    message.error('Failed to schedule pickups.');
                    throw new Error('Failed to schedule pickups.')
                }
            })
            .catch(error => {
                console.error(error);
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