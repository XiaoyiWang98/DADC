import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps"
import React, {Component} from 'react';

class NormalMap extends Component{

    render() {
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
            >
                {this.props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
            </GoogleMap>
            )

    }
}

const DADCMap = withScriptjs(withGoogleMap(NormalMap));
export default DADCMap;
