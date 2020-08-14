import React, {Component} from "react";
import MapComposite from "./MapComposite";


class MapCompositeTestLoader extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: []
        };
        // make dummy item list
        const item = {
            itemId: 0,
            status: "pending",
            post_date: "2020-08-14",
            lat: 37.401288,
            lng: -121.977793,
            name: "name",
            address: {
                address: "1 Infinite Loop",
                city: "Cupertino",
                state: "CA",
                zip: 95014
            },
            description: "blah blah blah blh.",
            image_link: "https://www.nindelivers.com/wp-content/uploads/2019/05/parcel-package.jpeg"
        }

        var i;
        for(i = 0; i<25; i++){
            item.itemId = i
            item.lat -= 0.01
            item.lng += 0.01
            item.name = "name " + i.toString()
            this.setState({items: this.state.items.push(Object.assign({}, item))})
        }
    }

    render() {

        return (
            <MapComposite items={this.state.items} center={{ lat: 37.351288, lng: -121.967793 }}/>
        );
    }
}
export default MapCompositeTestLoader