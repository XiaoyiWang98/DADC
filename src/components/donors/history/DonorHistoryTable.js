import React, {Component} from 'react';
import {Avatar, List, message, Spin, Button, Modal} from "antd";
import {COMPLETE_MSG, COMPLETED, PENDING, SCHEDULED_MSG, PENDING_MSG} from "./constants";
import gift from "../../../assets/images/gift.svg";
import {DeleteTwoTone} from '@ant-design/icons';
import {API_ROOT, AUTH_HEADER} from "../../../constants"


class DonorHistoryTable extends Component {
    state={
        donations:null,
        visibleModal:false
    }
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
                                      avatar={<Avatar size={60} src={donations.imageUrl} alt="donation items"/>}
                                      title={<p>{donations.name}</p>}
                                      description={<div><div>Describtion: {donations.description}</div>
                                      <div>Post Time: {donations.postTime}</div>
                                                        </div>
                                    
                                    }
                                  /> {
                                  donations.status == 2 ?
                                        <div className="donation-complete-text">
                                          <div>{COMPLETE_MSG}</div>
                                  <div>{`Picked Up By ${donations.NGOID} `}</div>
                                  <div>On {donations.scheduleTime}</div>
                                        </div>
                                      : donations.status == 0 ?
                                      <div className="delete_button_box">
                                          
                                          <div className="donation-pending-text">{PENDING_MSG}  <DeleteTwoTone twoToneColor="#02a95c" size="large"  onClick={()=>{this.showModal(donations)}}/> </div>
                                          <Modal
                    title="Delete Donation"
                    visible={this.state.visibleModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={
                        [<Button key="back" onClick={this.handleCancel}>Cancel</Button>,
                            <Button key="submit" onClick={this.handleOk}>Delete</Button>]
                    }
                >
                        <p>Regret about your donation? Someone really needs it!</p>
                </Modal>
                                      </div>
                                      :
                                      <div className="donation-scheduled-text">
                                            <div>{`${SCHEDULED_MSG} ${donations.scheduleTime}`}</div>
                                            <div>{`Pick Up Ngo: ${donations.NGOID}`}</div>
                                        </div>
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
    showModal=(donations)=>{
        this.setState({
            donations:donations,
            visibleModal:true
        })
    }

    handleOk = e => {
        // console.log(e);
        // console.log("Pickup information:\nDate: ", this.state.pickupDate, "\nItems: ", this.state.selected);
        this.setState({
            visibleModal: false,
        });
        this.deletePost(this.state.donations);
    }

    handleCancel = e => {
        // console.log(e);
        // console.log("cancelled");
        this.setState({
            visibleModal: false,
        });
    };

}

export default DonorHistoryTable;