import React, {Component} from 'react';
import DADCMap from './DADCMap'
import MapItemList from "./MapItemList";

class MapComposite extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedStatus: {},
            hoverStatus: {}
        };
        this.props.items.forEach(
            (item) => {
                this.setState({selectedStatus: this.state.selectedStatus[item.itemId] = false})
                this.setState({selectedStatus: this.state.hoverStatus[item.itemId] = false})
            }
        )

    }
    markSelected =  (id, checked) => {
        this.setState((state) => {
          state.selectedStatus[id] = checked;
          return state;
        })
    }
    markHover = (id, hover) => {
        this.setState((state) => {
            state.hoverStatus[id] = hover;
            return state;
        })
    }
    render(){
        // console.log(this.state.selectedStatus)
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
                        selectedIds = {JSON.stringify(this.state.selectedStatus)}
                        hoverIds = {JSON.stringify(this.state.hoverStatus)}
                    />
                </div>
                <div>

                <div className="itemList">
                    <MapItemList
                        items={this.props.items}
                        markFunction={this.markSelected}
                        hoverFunction={this.markHover}
                        outMarkFunction={this.props.handleCheckedFunction}
                    />
                </div>
                </div>
            </div>

            )

    }
}

export default MapComposite;