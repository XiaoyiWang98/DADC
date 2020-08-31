import React, {Component} from "react";
import MapComposite from "./MapComposite";


class MapCompositeTestLoader extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: [],
            checked: []
        };
        // make dummy item list
        const item = {
            itemId: 0,
            status: "pending",
            post_date: "2020-08-14",
            lat: 37.373288,
            lng: -121.967793,
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
        var xd = 0.00, yd = 0.007;
        for(i = 0; i<10; i++){
            if( i%5 == 0){
                xd = -0.007
                yd = - yd
            }else{
                xd = 0

            }
            item.itemId = i
            item.lat += xd
            item.lng += yd
            item.name = "name " + i.toString()
            this.setState({items: this.state.items.push(Object.assign({}, item))})
        }
    }

    componentDidMount() {
    }

    handlechecked = (id, check) => {
        if (check && this.state.checked.indexOf(id) === -1){
            this.setState((state) => {
                state.checked.push(id);
                return state;
            })
        }else{

            this.setState(this.setState((state) => {
                state.checked.splice(state.checked.indexOf(id),1);
                return state;
            }))
        }

    }

    render() {

        return (
            <MapComposite items={this.state.items}
                          center={{ lat: 37.351288, lng: -121.967793 }}
                          // handleCheckedFunction={this.handlechecked}
            />
        );
    }
}
export default MapCompositeTestLoader