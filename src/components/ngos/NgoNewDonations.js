import React, {Component} from 'react';

import {Button, Modal, message, DatePicker, Spin} from "antd";

import MapComposite from "./map/MapComposite";

import {API_ROOT, AUTH_HEADER} from "../../constants";


class NgoNewDonations extends Component {
    // constructor() {
    //     super();
    //     const now = new Date();
    //     this.state = {
    //         pickupDate: null,
    //         pickupList: this.props.pickupList,
    //         selected: [],
    //         center: { lat: 37.351288, lng: -121.967793 },
    //         visibleModal: false,
    //         errorMessage: ""
    //     }
    //
    //     // render fake list
    //     // const item = {
    //     //     itemId: 0,
    //     //     status: "pending",
    //     //     post_date: "2020-08-14",
    //     //     lat: 37.373288,
    //     //     lng: -121.967793,
    //     //     name: "name",
    //     //     address: {
    //     //         address: "1 Infinite Loop",
    //     //         city: "Cupertino",
    //     //         state: "CA",
    //     //         zip: 95014
    //     //     },
    //     //     description: "blah blah blah blh.",
    //     //     image_link: "https://www.nindelivers.com/wp-content/uploads/2019/05/parcel-package.jpeg"
    //     // }
    //     //
    //     // var i;
    //     // var xd = 0.00, yd = 0.007;
    //     // for(i = 0; i<25; i++){
    //     //     if( i%5 == 0){
    //     //         xd = -0.007
    //     //         yd = - yd
    //     //     }else{
    //     //         xd = 0
    //     //     }
    //     //     item.itemId = i
    //     //     item.lat += xd
    //     //     item.lng += yd
    //     //     item.name = "name " + i.toString()
    //     //     this.setState({pickupList: this.state.pickupList.push(Object.assign({}, item))})
    //     // }
    // }

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

    parseData = (data) => {

        const item = {
            itemId: 0,
            status: 0,
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
        let list = []
        for (i = 0; i < data.length; i++) {
            const cur = data[i];
            item.itemId = cur.itemID;
            item.status = cur.status;
            item.name = cur.name;
            item.description = cur.description;
            item.image_link = cur.imageUrl;
            item.address.address = cur.address.split(",")[0];
            item.address.city = cur.address.split(",")[1];
            item.address.state = cur.address.split(",")[2].split(" ")[1];
            item.address.zip = cur.address.split(",")[2].split(" ")[2];
            item.lat = parseFloat(cur.location.split(" ")[0].split(",")[0]);
            item.lng = parseFloat(cur.location.split(" ")[1]);
            list.push(Object.assign({}, item));
        }

        this.setState({pickupList: list});
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
                // console.log(data[0]);
                // this.setState({
                //     pickupList: data
                // })
                this.parseData(data);
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
                month: date.getMonth() + 1,
                date: date.getDate()
            },
            errorMessage: ""
        }))
    }

    schedulePickup = () => {
        // console.log(this.state);
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
            "ScheduleDate": `${pickupDate.year}-${pickupDate.month < 10 ? 0 : ''}${pickupDate.month}-${pickupDate.date < 10 ? 0 : ''}${pickupDate.date}`,
            "itemIds": selected
        })

        // console.log(pickData);

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