import React, {Component} from 'react';
import DADCMap from './DADCMap'
import MapItemList from "./MapItemList";

class MapComposite extends Component{
    constructor(props){
        super(props)
        this.state = {
        };
    }
    render(){
        // console.log(this.props.items)
        return(
            <div className="mapComposite">
                <div className="map">
                    <DADCMap
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCq-BRueDRRCUgFkqTgO93mFkgBfP0hOjU&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{height: `100%`}}/>}
                        containerElement={<div style={{height: `100%`}}/>}
                        mapElement={<div style={{height: `100%`}}/>}
                        mapCenter = {this.props.center}
                        items = {this.props.items}
                    />
                </div>
                <div>

                <div className="itemList">
                    <MapItemList items={this.props.items}/>
                </div>
                </div>
            </div>

            )

    }
}

export default MapComposite;