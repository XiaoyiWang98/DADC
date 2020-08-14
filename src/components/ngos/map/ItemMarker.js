import React, {Component} from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import codeBoxIcon from "../../../assets/images/codepen.svg"


class ItemMarker extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const position = {lat: this.props.item.lat, lng: this.props.item.lng}
        const icon = {
            url: codeBoxIcon,
            scaledSize: new window.google.maps.Size(35, 35)
        }
        return(
            <Marker
                position={position}
                icon={icon}
            />
        )
    }
}
export default ItemMarker