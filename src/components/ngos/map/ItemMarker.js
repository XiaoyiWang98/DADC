import React, { Component } from "react";
import { Marker, InfoWindow } from "react-google-maps";
import packageIconAttention from "../../../assets/images/Google_Maps_pin.svg";
import packageIconSelected from "../../../assets/images/blue-marker.svg";
import packageIcon from "../../../assets/images/Google_Maps_pin.svg";

class ItemMarker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const position = { lat: this.props.item.lat, lng: this.props.item.lng };
    var colorUrl;
    var icon;
    if (this.props.colorlvl === "selected") {
      colorUrl = packageIconSelected;
      icon = {
        url: colorUrl,
        scaledSize: new window.google.maps.Size(26, 41),
      };
    } else if (this.props.colorlvl === "attention") {
      colorUrl = packageIconAttention;
      icon = {
        url: colorUrl,
        scaledSize: new window.google.maps.Size(34, 53),
      };
    } else if (this.props.colorlvl === "select-attention") {
      colorUrl = packageIconSelected;
      icon = {
        url: colorUrl,
        scaledSize: new window.google.maps.Size(34, 53),
      };
    } else {
      colorUrl = packageIcon;
      icon = {
        url: colorUrl,
        scaledSize: new window.google.maps.Size(26, 41),
      };
    }

    return <Marker position={position} icon={icon} />;
  }
}
export default ItemMarker;
