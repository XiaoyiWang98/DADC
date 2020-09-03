import React, {Component} from 'react';
import {Button, Modal} from "antd";

import MapComposite from "../map/MapComposite";

class NgoHistoryMapView extends Component {
    constructor() {
        super();
        this.state = {
            showOnMap: false,
            pickupList: [],
            center: { lat: 37.351288, lng: -121.967793 }
        }
    }

    handleOk = e => {
        this.setState({
            showOnMap: false,
        });
    };

    handleCancel = e => {
        this.setState({
            showOnMap: false,
        });
    };

    getMapCenter = (pickupList) => {
        // TODO: We can later use (lat_min + lat_max) / 2, (lng_min + lng_max) / 2 for center
        return {lat: pickupList[0].lat, lng: pickupList[0].lng};
    }

    render() {
        return (
            <div>
                <Modal
                    width={1200}
                    title="View On Map"
                    visible={this.state.showOnMap}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={<Button key="back" type="primary" onClick={this.handleCancel}>Back to history</Button>}
                >
                    <MapComposite
                        items={this.props.pickupList}
                        center={this.getMapCenter(this.props.pickupList)}
                    />
                </Modal>
                
            </div>
        );
    }
}

export default NgoHistoryMapView;