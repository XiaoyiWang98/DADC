import React, {Component} from 'react';
import {Avatar, Button, DatePicker, Dropdown, List, Menu, Spin} from "antd";

import {COMPLETED, COMPLETE_MSG, PENDING_MSG} from "../../constants";
import gift from "../../assets/images/gift.svg";

class PickupList extends Component {

    constructor() {
        super();
        this.state = {
            filtered_pickups: [],
            isLoad: false
        }
    }

    handle_viewOnMap = () => {
        console.log("View on Map clicked!");
        // TODO: Route to Map page
    }

    handle_markComplete = () => {
        console.log("Mark complete clicked!");
        // TODO: send http request to backend to update order status
    };

    render() {
        const { isLoad, past_pickups } = this.props; // TODO: add isLoad prop in parent component
        const { filtered_pickups } = this.state;

        // TODO: Filter the list by status


        // TODO: extract date, total stops and total items by GET request

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
                          dataSource={past_pickups}
                          renderItem={schedule => {return(

                              <List.Item actions={[
                                  <Button onClick={this.handle_viewOnMap}>View on Map</Button>,
                                  schedule.status === COMPLETED ? null
                                      : <Button onClick={this.handle_markComplete}>Mark Completed</Button>]}>
                                  <List.Item.Meta
                                      avatar={<Avatar size={60} src={gift} alt="donation items"/>}
                                      title={<p>{`Total Items: ${schedule.itemList.length}`}
                                      <br/>{`Total Stops: ${schedule.totalLocations}`}</p>}
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



class NgoHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // TODO: Add pickup status filter
        }
    }

    getHistoryList = () => {
        console.log("NGO-history!");

    }

    onDateChange = (date, dateStr) => {
        console.log(date, dateStr);
    }


    render() {
        return (
            <div className="ngo-history">
                <h1 className="ngo-history-heading">Past Donation Pickups</h1>

                <DatePicker className="ngo-history-datepicker" onChange={this.onDateChange} />
                <PickupList past_pickups={this.props.past_pickups}
                            isLoad={this.props.isLoad}/>
            </div>
        );
    }
}

export default NgoHistory;