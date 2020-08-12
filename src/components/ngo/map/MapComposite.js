import React, {Component} from 'react';
import DADCMap from './DADCMap'
import MapItemList from "./MapItemList";

class MapComposite extends Component{
    render(){
        return(
            <div className="mapComposite">
                <div className="map">
                    <DADCMap
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{height: `100%`}}/>}
                        containerElement={<div style={{height: `100%`}}/>}
                        mapElement={<div style={{height: `100%`}}/>}
                    />
                </div>
                <div className="itemList">
                    <MapItemList />
                </div>
            </div>

            )

    }
}

export default MapComposite;