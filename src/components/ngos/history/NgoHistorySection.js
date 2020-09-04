import React, {Component} from 'react';
import {DatePicker, Spin} from "antd";
import {ALL} from "./constants";
import NgoHistoryTable from "./NgoHistoryTable";
import StatusFilter from "./StatusFilter";
import {API_ROOT, AUTH_HEADER} from "../../../constants";
import {COMPLETED} from "./constants";

class NgoHistorySection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected_status: ALL,
            full_history: [],
            history_to_display: [],
            isLoading: false
        }
    }

    componentDidMount() {
        const {auth_token} = this.props;

        this.setState({ isLoading: true});
        fetch(`${API_ROOT}/ngo/my_schedule`, {
            method: 'GET',
            headers: {
                Authorization: `${AUTH_HEADER} ${auth_token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Past pickup response: ", response);
                    return response.json();
                }
                throw new Error('Failed to load pickup history!');
            })
            .then((data) => {
                console.log('Past pickup schedules', data);

                this.setState({
                    full_history: data ? data : [],
                    history_to_display: data ? data : [],
                    isLoading: false});
            })
            .catch((err) => {
                console.error("Error in loading pickup history!", err);
                this.setState({isLoading: false})
            });
    }

    onDateChange = (date, dateStr) => {
        const {full_history} = this.state;
        if (date != null) {
            this.setState({
                history_to_display: full_history.filter(entry => entry.scheduleTime === dateStr)
            })
        } else {
            this.setState({history_to_display: full_history});
        }
    }

    onStatusFilter = key => {
        const {full_history} = this.state;
        // Filter the pickup history list by status
        if (key == ALL) {
            this.setState({
                selected_status: key,
                history_to_display: full_history});
        } else {
            this.setState({
                selected_status: key,
                history_to_display: full_history.filter(entry => entry.status == key)});
        }
    }

    updateHistory = (completed_schedule_id) => {
        const {full_history, history_to_display} = this.state;
        const new_full_history = full_history.map(
            pickup => {return pickup.scheduleID !== completed_schedule_id ? pickup : {...pickup, status: COMPLETED}});
        const new_history_to_display = history_to_display.map(
            pickup => {return pickup.scheduleID !== completed_schedule_id ? pickup : {...pickup, status: COMPLETED}});

        this.setState({
            full_history: new_full_history,
            history_to_display: new_history_to_display
        });
    }

    render() {
        const {isLoading, history_to_display} = this.state;
        return (
            <div className="history-container">
                <h1 className="history-heading">Past Donation Pickups</h1>
                <StatusFilter filterBy={this.onStatusFilter}/>
                <DatePicker className="history-datepicker" onChange={this.onDateChange}/>
                {isLoading
                    ? <Spin className="history-spin" tip="Loading past pickup schedules..." size="large"/>
                    : <NgoHistoryTable filtered_history={history_to_display}
                                       auth_token={this.props.auth_token}
                                       update_history={this.updateHistory}
                    />
                }
            </div>
        );
    }
}

export default NgoHistorySection;
