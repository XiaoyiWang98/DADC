import React, {Component} from 'react';
import {DatePicker} from "antd";

import {ALL} from "./constants";
import NgoHistoryTable from "./NgoHistoryTable";
import StatusFilter from "./StatusFilter";


class NgoHistorySection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_status: ALL,
            history_to_display: this.props.full_history
        }
    }

    onDateChange = (date, dateStr) => {
        const {full_history} = this.props;
        console.log("Selected Date:", date, dateStr);
        if (date != null) {
            this.setState({
                history_to_display: full_history.filter(entry => entry.scheduleDate === dateStr)
            })
        } else {
            this.setState({history_to_display: this.props.full_history});
        }
    }

    onStatusFilter = key => {
        const {full_history} = this.props;
        console.log("Filter by order status: ", key);
        // Filter the pickup history list by status
        if (key === ALL) {
            this.setState({
                selected_status: key,
                history_to_display: this.props.full_history
            });
        } else {
            this.setState({
                selected_status: key,
                history_to_display: full_history.filter(entry => entry.status === key)});
        }
    }


    render() {
        return (
            <div className="history-container">
                <h1 className="history-heading">Past Donation Pickups</h1>
                <StatusFilter filterBy={this.onStatusFilter}/>
                <DatePicker className="history-datepicker" onChange={this.onDateChange}/>
                <NgoHistoryTable filtered_history={this.state.history_to_display} isLoad={this.props.isLoad}/>
            </div>
        );
    }
}

export default NgoHistorySection;