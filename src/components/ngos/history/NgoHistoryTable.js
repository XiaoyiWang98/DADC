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
import NgoHistoryMapView from "./NgoHistoryMapView";
import MapComposite from "../map/MapComposite";


class NgoHistoryTable extends Component {
    constructor() {
        super();
        this.state = {
            showOnMap: false,
            pickupList: [],
            center: { lat: 0, lng: 0 }
        }
    }

    handle_viewOnMap = (e) => {
        console.log("View on Map clicked!");

        const pickup_items = e.target.value;
        console.log("Pickup Items: ", pickup_items);

        // // TODO: Mount a NgoHistoryMapView component
        this.setState({
            showOnMap: true,
            pickupList: e.target.value
        });
    }

    handle_markComplete = (e) => {
        console.log("Mark complete trigger event:", e);
        e.target.style.display = "none";  // Make the button disappear

        let schedule_id = e.target.value;
        axios.post(
            `${API_ROOT}/${URL_POST_SCHEDULE_COMPLETED}/${schedule_id}`,
            {schedule_id: schedule_id},
            {headers: {"Authorization": `${AUTH_HEADER} ${this.props.auth_token}`}})
            .then( response => {
                console.log("Mark complete succeeded!");
                message.success("This pickup is completed!");
            })
            .catch( error => {
                console.log("Mark complete FAILED!", error);
                alert("Fail to mark this schedule as completed!");
        });
    };

    getMapCenter = (pickupList) => {
        // TODO: We can later use (lat_min + lat_max) / 2, (lng_min + lng_max) / 2 for center
        return pickupList
            ? {lat: pickupList[0].lat, lng: pickupList[0].lng}
            : {lat: 40, lng: 74};
    }

    render() {
        const { filtered_history } = this.props;
        return(
            <div className="ngo-pickup-list-box">
                <List className="ngo-pickup-list"
                      itemLayout="horizontal"
                      size="large"
                      dataSource={filtered_history}
                      renderItem={schedule => {return(
                          <List.Item actions={[
                              <Button value={schedule.itemList} onClick={this.handle_viewOnMap}>View on Map</Button>,
                              schedule.status === COMPLETED ? null
                                  : <Button value={schedule.scheduleId} onClick={this.handle_markComplete}>
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


                {/*<Modal*/}
                {/*    width={1200}*/}
                {/*    title="View On Map"*/}
                {/*    visible={this.state.showOnMap}*/}
                {/*    onOk={this.handleOk}*/}
                {/*    onCancel={this.handleCancel}*/}
                {/*    footer={<Button key="back" type="primary" onClick={this.handleCancel}>Back to history</Button>}*/}
                {/*>*/}
                {/*    <MapComposite*/}
                {/*        items={this.props.pickupList}*/}
                {/*        center={this.getMapCenter(this.props.pickupList)}*/}
                {/*    />*/}
                {/*</Modal>*/}

            </div>
        );
    }
}

export default NgoHistoryTable;