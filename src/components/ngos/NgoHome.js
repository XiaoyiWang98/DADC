import React, { Component } from "react";
import { Button, Tabs, Spin } from "antd";
import { API_ROOT, AUTH_HEADER } from "../../constants";
import { Link } from "react-router-dom";
import sad from "../../assets/images/sad.jpg";

class NgoHome extends Component {
  state = {
    lastName: this.props.info.lastName,
    firstName: this.props.info.firstName,
    isLoadingItems: false,
    token: this.props.info.token,
    error: "",
    NgoItems: [],
  };

  componentDidMount() {
    this.setState({ isLoadingItems: true, error: "" });
    fetch(`${API_ROOT}/ngo/search_item`, {
      method: "GET",
      headers: {
        Authorization: `${AUTH_HEADER} ${this.state.token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error("Failed to load donorItems");
      })
      .then((data) => {
        // handle the case when data is {"result": "FAILED"}
        if (data.length === undefined) {
          throw new Error("Failed to load donorItems");
        } else {
          this.setState({ NgoItems: data ? data : [], isLoadingItems: false });
          this.props.collectSearchItem(data);
        }
      })
      .catch((e) => {
        console.error(e);
        this.setState({ isLoadingItems: false, error: e.message });
      });
  }

  render() {
    const donationCount = this.state.NgoItems.length;
    const is_are_text = donationCount === 1 ? "is" : "are";
    const loading = this.state.isLoadingItems;
    return (
      <div className="main-content content-home">
        {loading ? (
          <Spin className="spin" tip="Loading..." />
        ) : (
          <div>
            {donationCount === 0 ? (
              <div>
                <div className="home-name">{this.state.firstName}:</div>
                <img className="home-img" src={sad} />
                <div className="ngo-home-noItem">
                  <div className="home-status-content">
                    There Are No New Donations
                  </div>
                  <div className="home-status-content">At This Time.</div>
                  <div className="home-status-content">
                    Please Check Back Later.
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="home-name">{this.state.firstName}:</div>
                <div className="home-status">
                  <div className="home-status-content">
                    There {is_are_text}
                    <div className="home-number">{donationCount}</div>
                  </div>
                  <div className="home-status-content">
                    new Donations Around Your Location!
                  </div>
                  <Link className="link jumper" to="/ngo/new_donation">
                    Check them out!
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default NgoHome;
