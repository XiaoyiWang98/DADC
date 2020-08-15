import React, {Component} from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import packageIconAttention from "../../../assets/images/package_attention.svg"
import packageIconSelected from "../../../assets/images/package_selected.svg"
import packageIcon from "../../../assets/images/package.svg"


class ItemMarker extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const position = {lat: this.props.item.lat, lng: this.props.item.lng}
        var colorUrl = packageIcon;
        if (this.props.colorlvl === 'selected'){
            colorUrl = packageIconSelected;
        }else if(this.props.colorlvl === 'attention'){
            colorUrl = packageIconAttention;
        }
        const icon = {
            url: colorUrl,
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