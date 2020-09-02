import React, {Component} from 'react';
import {Avatar, List, message, Spin, Button} from "antd";
import {COMPLETE_MSG, COMPLETED, PENDING, SCHEDULED_MSG, PENDING_MSG} from "./constants";
import gift from "../../../assets/images/gift.svg";
import {API_ROOT, AUTH_HEADER} from "../../../constants"


class DonorHistoryTable extends Component {

    render() {
        console.log(this.props.info)
        const {isLoad} = this.props;
        // TODO: Get donation status and format scheduled str with scheduled date
        return (
            <div className="donor-history-list-box">
                {isLoad ?
                    <div className="spin-box">
                        <Spin tip="Loadiing..." size="large"/>
                    </div>
                    :
                    <List className="donor-history-list"
                          itemLayout="horizontal"
                          size="large"
                          dataSource={this.props.filtered_history}
                          renderItem={donations => (
                              <List.Item>
                                  <List.Item.Meta
                                      avatar={<Avatar size={60} src={donations.image_link} alt="donation items"/>}
                                      title={<p>{`Item Name: ${donations.name}`}</p>}
                                      description={`Date: ${donations.post_date}`}
                                  /> {
                                  donations.status == 2 ?
                                      <div className="donation-complete-text">{COMPLETE_MSG}</div>
                                      : donations.status == 0 ?
                                      <div className="delete_button_box">
                                          <Button
                                              className="delete_button"
                                              type="primary"
                                              onClick={() => this.deletePost(donations)}
                                          > delete </Button>
                                          <div className="donation-pending-text">{PENDING_MSG}</div>
                                      </div>
                                      :
                                      <div className="donation-scheduled-text">{`SCHEDULED_MSG + ${donations.scheduleTime}`}</div>
                              }
                              </List.Item>
                          )}
                    />
                }
            </div>
        );
    }

    deletePost = donations => {
        fetch(`${API_ROOT}/donor/delete_item?item_id=${donations.itemID}`, {
            method: 'POST',
            headers: {
                Authorization: `${AUTH_HEADER} ${this.props.info.token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to send request.');
            })
            .then((data) => {
                console.log(data.result)
                if (data.result === "SUCCESS") {
                    message.success('Delete created successfully!');
                    const newList = this.props.filtered_history.filter(item => item.itemID != donations.itemID);
                    this.props.updateList(newList);
                } else {
                    throw new Error('Failed to delete post.')
                }
            })
            .catch((e) => {
                console.error(e);
                message.error('Failed to delete post.');
            });

    }

}

export default DonorHistoryTable;