import {GoogleMap, Marker, withGoogleMap, withScriptjs,
    DirectionsRenderer} from "react-google-maps"
import React, {Component} from 'react';
import ItemMarker from "./ItemMarker";
import homeFilledUrl from "../../../assets/images/homeFilled.svg"


class NormalMap extends Component{
    constructor(props) {
        super(props)
        this.state={
            directions: null,
            lastRouteUpdate: 0
        }
        // this.props.items.forEach(
        //     (item) => {
        //         this.setState({a: this.state[item.itemId] = false})
        //     }
        // )
    }
    componentDidUpdate(prevProps, prevState) {
        const thisTime = new Date().getTime();

        if(prevProps.selectedIds === this.props.selectedIds) {
            // console.log('rejected, same id')

        }else if(this.state.lastRouteUpdate + 500 > thisTime){

        }else {
            const google = window.google
            const DirectionsService = new google.maps.DirectionsService();
            const waypoints = []
            this.props.items.forEach(
                p => {
                    if (JSON.parse(this.props.selectedIds)[p.itemId]) {
                        waypoints.push(
                            {
                                location: {lat: p.lat, lng: p.lng},
                                stopover: true
                            }
                        )
                    }
                }
            )
            // this.props.items.map(p => ({
            // location: { lat: p.lat, lng: p.lng },
            // stopover: true
            // }));

            if (waypoints.length === 0) {
                this.setState({directions: null, lastRouteUpdate: thisTime});
            } else {
                // console.log('requested!')
                DirectionsService.route({
                    origin: new google.maps.LatLng(this.props.mapCenter.lat, this.props.mapCenter.lng),
                    destination: new google.maps.LatLng(this.props.mapCenter.lat, this.props.mapCenter.lng),
                    waypoints: waypoints,
                    travelMode: google.maps.TravelMode.DRIVING,
                }, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        this.setState({directions: result, lastRouteUpdate: thisTime});
                        return true
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                })

            }
        }
    }

    render() {
        const homeIcon = {
            url: homeFilledUrl,
            scaledSize: new window.google.maps.Size(35, 35)
        }
        const itemMarkers = []
        this.props.items.forEach(item=>{
            if (JSON.parse(this.props.hoverIds)[item.itemId]){
                itemMarkers.push(<ItemMarker key={item.itemId} item={item} colorlvl='attention'/>)
            } else if (JSON.parse(this.props.selectedIds)[item.itemId]) {
                itemMarkers.push(<ItemMarker key={item.itemId} item={item} colorlvl='selected'/>)
            } else{
                itemMarkers.push(<ItemMarker key={item.itemId} item={item} colorlvl='regular'/>)
            }
        })
        const routeMarkers = []
        if (this.state.directions){
            // console.log(this.state.directions)
            var markerNumber = 1
            this.state.directions.request.waypoints.forEach( point => {
                routeMarkers.push(<Marker key={markerNumber}
                                          position={point.location.location}
                                          label={{text:markerNumber.toString(),
                                                    color:'red',
                                                    fontSize: '36px',
                                                    fontWeight: 'bold'}}
                                          icon={{path:window.google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
                                          scale: 1,
                                          strokeColor:'red'}}

                />);
                markerNumber ++;
            }

            )
        }
        // console.log(routeMarkers)

        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={this.props.mapCenter}
            >
                {<Marker position={this.props.mapCenter} icon={homeIcon} />}
                {itemMarkers}
                {routeMarkers}
                {this.state.directions && <DirectionsRenderer directions={this.state.directions}
                                                              options={{
                                                                  markerOptions: {
                                                                      icon: {path:window.google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
                                                                          scale: 4,
                                                                          strokeColor:'green'},
                                                                      animation: window.google.maps.Animation.BOUNCE

                                                              }
                                                              }} />}

            </GoogleMap>
            )

    }
}

const DADCMap = withScriptjs(withGoogleMap(NormalMap));
export default DADCMap;
