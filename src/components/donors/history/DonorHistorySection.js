import React, {Component} from 'react';
import {DatePicker} from "antd";

import {ALL} from "./constants";
import DonorHistoryTable from "./DonorHistoryTable";
import StatusFilter from "./StatusFilter";


class DonorHistorySection extends Component {
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
                history_to_display: full_history.filter(entry => entry.post_date === dateStr)
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
        console.log("Donor History list: ", this.props.full_history);
        return (
            <div className="main-content">
                <h1 className="main-title">Past Donation Pickups</h1>
                <hr className="divide"/>
                <StatusFilter filterBy={this.onStatusFilter}/>
                <DatePicker className="history-datepicker" onChange={this.onDateChange}/>
                <DonorHistoryTable filtered_history={this.state.history_to_display} isLoad={this.props.isLoad}/>
            </div>
        );
    }
}

export default DonorHistorySection;