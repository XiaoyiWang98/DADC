import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Button, List, Spin, message, Modal} from "antd";
import axios from "axios";
import {API_ROOT, AUTH_HEADER} from "../../../constants";

import {
    COMPLETE_MSG, COMPLETED, PENDING_MSG,
    URL_GET_SCHEDULES, URL_POST_SCHEDULE_COMPLETED
} from "./constants";
import gift from "../../../assets/images/gift.svg";
import MapComposite from "../map/MapComposite";
import {formatItemList} from "../../../Utils";


class NgoHistoryTable extends Component {
    constructor() {
        super();
        console.log("HistoryTable props", this.props);
        this.state = {
            showOnMap: false,
            itemList: [],
            center: { lat: 0, lng: 0 }
        }
    }

    getStatusList = (past_pickups) => {
        console.log("past pickups", past_pickups);
        const statusList = [];
        past_pickups.forEach(schedule => {
            statusList.push(schedule.status);
        });
        return statusList;
    }

    handle_viewOnMap = (e) => {
        console.log("View on Map clicked!");
        const item_list_unparsed = JSON.parse(e.target.value);
        const item_list = formatItemList(item_list_unparsed);
        this.setState({
            showOnMap: true,
            itemList: item_list
        })
    }

    handle_markComplete = (e) => {
        console.log("Mark complete clicked!");
        let schedule_id = e.target.value;

        console.log("[MarkComplete] e.target:", e.target);
        console.log("target style.display: ", e.target.style.display);
        // // Make the button disappear
        e.target.style.display = "none";

        axios.post(
            `${API_ROOT}/ngo/complete_schedule?${schedule_id}`,
            {schedule_id: schedule_id},
            {headers: {"Authorization": `${AUTH_HEADER} ${this.props.auth_token}`}})
            .then( (response) => {
                console.log("Mark complete succeeded!", response);
                message.success("This pickup is completed!");
                // TODO: Make Button disappear is buggy (Need to persist the event to set its style...)
                this.props.update_history(schedule_id);
            })
            .catch( error => {
                console.log("Mark complete FAILED!", error);
                alert("Fail to mark this schedule as completed!");
            });
    };

    getMapCenter = (itemList) => {
        // TODO: We can later use (lat_min + lat_max) / 2, (lng_min + lng_max) / 2 for center
        return itemList.length > 0
            ? {lat: itemList[0].lat, lng: itemList[0].lng}
            : {lat: 40, lng: 74};
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
        const { filtered_history } = this.props;
        return(
            <div className="ngo-pickup-list-box">
                <List className="ngo-pickup-list"
                      itemLayout="horizontal"
                      size="large"
                      dataSource={filtered_history}
                      renderItem={schedule => {
                          console.log("Single pickup schedule: ", schedule, typeof schedule);
                          return(
                          <List.Item actions={[
                              <Button value={JSON.stringify(schedule.itemList)} onClick={this.handle_viewOnMap}>View on Map</Button>,
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
                        center={this.getMapCenter(this.state.itemList)}
                    />
                </Modal>

            </div>
        );
    }
}

export default NgoHistoryTable;