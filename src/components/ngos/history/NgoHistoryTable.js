import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Button, List, Spin} from "antd";
import axios from "axios";

import {
    COMPLETE_MSG, COMPLETED, PENDING_MSG,
    URL_GET_SCHEDULES, URL_POST_COMPLETE_SCHEDULE
} from "./constants";
import gift from "../../../assets/images/gift.svg";


class NgoHistoryTable extends Component {

    handle_viewOnMap = () => {
        console.log("View on Map clicked!");
        // let path = "/completed_pickup";
        // let history = useHistory();
        // history.push(path);
    }

    handle_markComplete = (e) => {
        console.log("Mark complete trigger event:", e);
        console.log("scheduleId: ", e.target.value);

        axios.post(URL_POST_COMPLETE_SCHEDULE,
            {schedule_id: e.target.value})
            .then( response => {
                console.log("Mark complete succeeded!");
            })
            .catch( error => {
                console.log("Mark complete FAILED!");
                alert("Fail to mark this schedule as completed!");
        });

        // TODO: Fetch history from backend again! <== multiple users modifying the same history list)

    };

    render() {
        const { isLoad, filtered_history } = this.props;
        return(
            <div className="ngo-pickup-list-box">
                {isLoad ?
                    <div className="spin-box">
                        <Spin tip="Loadiing..." size="large"/>
                    </div>
                    :
                    <List className="ngo-pickup-list"
                          itemLayout="horizontal"
                          size="large"
                          dataSource={filtered_history}
                          renderItem={schedule => {return(

                              <List.Item actions={[
                                  <Link to={"/completed_pickup"}>
                                      {/*TODO: Fow now, route to NgoNewDonations (replace with a new component later)*/}
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
                }
            </div>
        );
    }
}

export default NgoHistoryTable;