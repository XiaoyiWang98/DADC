import React, { Component } from "react";
import { DatePicker } from "antd";

import { ALL } from "./constants";
import DonorHistoryTable from "./DonorHistoryTable";
import StatusFilter from "./StatusFilter";

class DonorHistorySection extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    selected_status: ALL,
    history_to_display: this.props.full_history,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.full_history != this.props.full_history) {
      this.setState({ history_to_display: this.props.full_history });
    }
  }

  onDateChange = (date, dateStr) => {
    const { full_history } = this.props;
    console.log("Choose A Post Date:", date, dateStr);
    if (date != null) {
      this.setState({
        history_to_display: full_history.filter(
          (entry) => entry.postTime === dateStr
        ),
      });
    } else {
      this.setState({ history_to_display: this.props.full_history });
    }
  };

  onStatusFilter = (key) => {
    const { full_history } = this.props;
    console.log("Filter by order status: ", key);
    // Filter the pickup history list by status
    if (key === ALL) {
      this.setState({
        selected_status: key,
        history_to_display: this.props.full_history,
      });
    } else if (key === "pending") {
      this.setState({
        selected_status: key,
        history_to_display: full_history.filter((entry) => entry.status == 0),
      });
    } else if (key === "scheduled") {
      this.setState({
        selected_status: key,
        history_to_display: full_history.filter((entry) => entry.status == 1),
      });
    } else {
      this.setState({
        selected_status: key,
        history_to_display: full_history.filter((entry) => entry.status == 2),
      });
    }
  };

  render() {
    console.log("Donor History list: ", this.props.full_history);
    console.log("history to display", this.state.history_to_display);
    return (
      <div className="main-content history-page">
        <h1 className="main-title">Past Donation Pickups</h1>
        <hr className="divide" />
        <div className="filter-setting">
          <StatusFilter filterBy={this.onStatusFilter} />
          <DatePicker onChange={this.onDateChange} />
        </div>
        <DonorHistoryTable
          updateList={this.props.updateList}
          filtered_history={this.state.history_to_display}
          isLoad={this.props.isLoad}
          info={this.props.info}
        />
      </div>
    );
  }
}

export default DonorHistorySection;
