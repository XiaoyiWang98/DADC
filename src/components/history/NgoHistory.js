import React, {Component} from 'react';
import {Button, DatePicker} from "antd";

import {ALL} from "./constants";
import HistoryTable from "./HistoryTable";
import StatusFilter from "./StatusFilter";


class NgoHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_status: ALL,
            pickups_to_display: this.props.past_pickups
        }
    }

    onDateChange = (date, dateStr) => {
        const {past_pickups} = this.props;
        console.log("Selected Date:", date, dateStr);
        if (date != null) {
            this.setState({
                pickups_to_display: past_pickups.filter(entry => entry.scheduleDate === dateStr)
            })
        } else {
            this.setState({pickups_to_display: this.props.past_pickups});
        }
    }

    onStatusFilter = key => {
        const {past_pickups} = this.props;
        console.log("Filter by order status: ", key);
        // Filter the pickup history list by status
        if (key === ALL) {
            this.setState({
                selected_status: key,
                pickups_to_display: this.props.past_pickups
            });
        } else {
            this.setState({
                selected_status: key,
                pickups_to_display: past_pickups.filter(entry => entry.status === key)});
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

        return (
            <div className="ngo-history">
                <h1 className="ngo-history-heading">Past Donation Pickups</h1>
                <StatusFilter filterBy={this.onStatusFilter}/>
                <DatePicker className="ngo-history-datepicker" onChange={this.onDateChange}/>
                <HistoryTable filtered_pickups={this.state.pickups_to_display}
                              isLoad={this.props.isLoad}/>
            </div>
        );
    }
}

export default NgoHistory;