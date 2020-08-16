import React, {Component} from 'react';
import {Avatar, Button, List, Spin} from "antd"
import {COMPLETE_MSG, COMPLETED, PENDING_MSG} from "./constants"
import gift from "../../assets/images/gift.svg"


class HistoryTable extends Component {

    render() {
        const { isLoad, filtered_pickups } = this.props;
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
                          dataSource={filtered_pickups}
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

export default HistoryTable;