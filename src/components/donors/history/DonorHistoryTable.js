import React, {Component} from 'react';
import {Avatar, List, Spin} from "antd";
import {COMPLETE_MSG, COMPLETED, PENDING, SCHEDULED_MSG, PENDING_MSG} from "./constants";
import gift from "../../../assets/images/gift.svg";


class DonorHistoryTable extends Component {

    render() {
        const { isLoad, filtered_history } = this.props;
        // TODO: Get donation status and format scheduled str with scheduled date
        const scheduled_msg = SCHEDULED_MSG + " 08-21-2020";
        return(
            <div className="donor-history-list-box">
                {isLoad ?
                    <div className="spin-box">
                        <Spin tip="Loadiing..." size="large"/>
                    </div>
                    :
                    <List className="donor-history-list"
                          itemLayout="horizontal"
                          size="large"
                          dataSource={filtered_history}
                          renderItem={donations => {return(
                              <List.Item>
                                  <List.Item.Meta
                                      avatar={<Avatar size={60} src={donations.image_link} alt="donation items"/>}
                                      title={<p>{`Item Name: ${donations.name}`}</p>}
                                      description={`Date: ${donations.post_date}`}/>
                                  {donations.status === COMPLETED
                                      ? <div className="donation-complete-text">{COMPLETE_MSG}</div>
                                      : donations.status === PENDING
                                          ? <div className="donation-pending-text">{PENDING_MSG}</div>
                                          : <div className="donation-scheduled-text">{scheduled_msg}</div>
                                  }
                              </List.Item>)
                          }}
                    />
                }
            </div>
        );
    }
}

export default DonorHistoryTable;