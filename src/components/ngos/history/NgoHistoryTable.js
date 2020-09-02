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


class NgoHistoryTable extends Component {
    constructor() {
        super();
        this.state = {
            showOnMap: false,
            pickupList: [],
            center: { lat: 37.351288, lng: -121.967793 }
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
                this.setState({pickupList: this.state.pickupList.push(Object.assign({}, item))})
            }
    }

    handle_viewOnMap = (e) => {
        console.log("View on Map clicked!");
        console.log(e.target.value[0]);
        this.setState({
            showOnMap: true,
            // pickupList: e.target.value
        });
        // let path = "/completed_pickup";
        // let history = useHistory();
        // history.push(path);
    }

    handleOk = e => {
        console.log(e);
        this.setState({
            showOnMap: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            showOnMap: false,
        });
    };

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

    // TODO: replace filtered_history to real history and check input value in buttons

    render() {
        const { filtered_history } = this.props;
        console.log(filtered_history);
        return(
            <div className="ngo-pickup-list-box">
                <List className="ngo-pickup-list"
                      itemLayout="horizontal"
                      size="large"
                      dataSource={filtered_history}
                      renderItem={schedule => {return(
                          <List.Item actions={[
                              <Button value={Object.values(schedule.itemList)} onClick={this.handle_viewOnMap}>View on Map</Button>,
                              schedule.status === COMPLETED ? null
                                  : <Button value={schedule.scheduleId} onClick={this.handle_markComplete}>
                                      Mark Completed</Button>]}>
                              <List.Item.Meta
                                  avatar={<Avatar size={60} src={gift} alt="donation items"/>}
                                  title={<p>{`Total Items: ${schedule.itemList.length}`}</p>}
                                  description={`Date: ${schedule.scheduleDate}`}/>
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
                        items={this.state.pickupList}
                        center={this.state.center}
                    />
                </Modal>
            </div>
        );
    }
}

export default NgoHistoryTable;