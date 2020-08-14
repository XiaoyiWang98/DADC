import {GoogleMap, Marker, withGoogleMap, withScriptjs,
    DirectionsRenderer} from "react-google-maps"
import React, {Component} from 'react';
import ItemMarker from "./ItemMarker";
import homeFilledUrl from "../../../assets/images/homeFilled.svg"

class NormalMap extends Component{
    constructor(props) {
        super(props)
        this.state={
            directions: null
        }
    }
    componentDidMount() {
        const google = window.google
        const DirectionsService = new google.maps.DirectionsService();
        const waypoints = this.props.items.map(p => ({
            location: { lat: p.lat, lng: p.lng },
            stopover: true
        }));
        DirectionsService.route({
            origin: new google.maps.LatLng(this.props.mapCenter.lat, this.props.mapCenter.lng),
            destination: new google.maps.LatLng(this.props.mapCenter.lat, this.props.mapCenter.lng),
            waypoints: waypoints,
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        })
    }

    render() {
        const homeIcon = {
            url: homeFilledUrl,
            scaledSize: new window.google.maps.Size(35, 35)
        }
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={this.props.mapCenter}
            >
                {<Marker position={this.props.mapCenter} icon={homeIcon} />}
                {this.props.items.map((item) => (<ItemMarker item={item} />))}
                {this.state.directions && <DirectionsRenderer directions={this.state.directions} />}
            </GoogleMap>
            )

    }
}

const DADCMap = withScriptjs(withGoogleMap(NormalMap));
export default DADCMap;
