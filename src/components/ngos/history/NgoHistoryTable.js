import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Button, List, Spin, message, Modal} from "antd";
import axios from "axios";
import {API_ROOT, AUTH_HEADER} from "../../../constants";

import {
  COMPLETE_MSG,
  COMPLETED,
  PENDING_MSG,
} from "./constants";
import gift from "../../../assets/images/gift.svg";
import MapComposite from "../map/MapComposite";
import {formatItemList} from "../../../Utils";

class NgoHistoryTable extends Component {

    constructor() {
        super();
        this.state = {
            showOnMap: false,
            itemList: [],
            center: {lat: 0, lng: 0}
        }
    }
    componentDidMount() {
        this.getMapCenter()
    }

    handle_viewOnMap = (e) => {
        const item_list_unparsed = JSON.parse(e.target.value);
        const item_list = formatItemList(item_list_unparsed);
        console.log("View on Map clicked! View on Map itemList: ", item_list);
        this.setState({
            showOnMap: true,
            itemList: item_list,
        }, function () {
            console.log("[VOM] after setState itemList:", this.state.itemList)
        })
    }

    handle_markComplete = (e) => {
        console.log("Mark complete clicked!");
        let schedule_id = e.target.value;

        console.log("[MarkComplete] e.target:", e.target);
        console.log("target style.display: ", e.target.style.display);
        // Make the button disappear
        e.target.style.display = "none";

        axios.post(
            `${API_ROOT}/ngo/complete_schedule?${schedule_id}`,
            {schedule_id: schedule_id},
            {headers: {"Authorization": `${AUTH_HEADER} ${this.props.auth_token}`}})
            .then((response) => {
                console.log("Mark complete succeeded!", response);
                message.success("This pickup is completed!");
                // TODO: Make Button disappear is buggy (Need to persist the event to set its style...)
                this.props.update_history(schedule_id);
            })
            .catch(error => {
                console.log("Mark complete FAILED!", error);
                alert("Fail to mark this schedule as completed!");
            });
    };

    getMapCenter = () => {
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

    handleOk = e => {
        this.setState({
            showOnMap: false,
        });
    };

    handleCancel = e => {
        this.setState({
            showOnMap: false,
        });
    };

    render() {
        const {filtered_history} = this.props;
        return (
            <div className="ngo-pickup-list-box">
                <List className="ngo-pickup-list"
                      itemLayout="horizontal"
                      size="large"
                      dataSource={filtered_history}
                      renderItem={schedule => {
                          return (
                              <List.Item actions={[
                                  <Button value={JSON.stringify(schedule.itemList)} onClick={this.handle_viewOnMap}>View
                                      on Map</Button>,
                                  schedule.status === COMPLETED ? null
                                      : <Button value={schedule.scheduleID} onClick={this.handle_markComplete}>
                                          Mark Completed</Button>]}>
                                  <List.Item.Meta
                                      avatar={<Avatar size={60} src={gift} alt="donation items"/>}
                                      title={<p>{`Total Items: ${schedule.itemList.length}`}</p>}
                                      description={`Date: ${schedule.scheduleTime}`}/>
                                  {schedule.status === COMPLETED
                                      ? <div className="ngo-pickup-complete-text">{COMPLETE_MSG}</div>
                                      : <div className="ngo-pickup-pending-text">{PENDING_MSG}</div>
                                  }
                              </List.Item>)
                      }}
                />
                <Modal
                    width={1200}
                    title="View On Map"
                    visible={this.state.showOnMap}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={<Button key="back" type="primary" onClick={this.handleCancel}>Back to history</Button>}
                >
                    <MapComposite
                        items={this.state.itemList}
                        center={this.state.center}
                    />
                </Modal>
            </div>
        );
    }
}

export default NgoHistoryTable;
