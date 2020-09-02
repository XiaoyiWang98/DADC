import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Button, List, Spin, message} from "antd";
import axios from "axios";
import {API_ROOT, AUTH_HEADER} from "../../../constants";

import {
    COMPLETE_MSG, COMPLETED, PENDING_MSG,
    URL_GET_SCHEDULES, URL_POST_SCHEDULE_COMPLETED
} from "./constants";
import gift from "../../../assets/images/gift.svg";


class NgoHistoryTable extends Component {

    handle_viewOnMap = () => {
        console.log("View on Map clicked!");

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
                              <Link to={"/ngo/mapTest"}>
                                  {/*TODO: Fow now, route to mapTest (replace with a new component later)*/}
                                  <Button onClick={this.handle_viewOnMap}>View on Map</Button>
                              </Link>,
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
            </div>
        );
    }
}

export default NgoHistoryTable;