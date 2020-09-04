import React, { Component } from "react";
import DADCMap from "./DADCMap";
import MapItemList from "./MapItemList";

class MapComposite extends Component {
  constructor(props) {
    super(props);

    const selected = {};
    const hover = {};
    this.props.items.forEach((item) => {
      selected[item.itemId] = false;
      hover[item.itemId] = false;
    });

    this.state = {
      selectedStatus: selected,
      hoverStatus: hover,
      items: this.props.items,
      items_order: [],
    };
    console.log("[MapComposite] items: ", this.state.items);
  }

  updateItemOrder = (orderList) => {
    this.setState({ items_order: orderList });
  };

  componentDidMount() {
    const mimicUpdate = () => {
      const selected = {};
      this.state.items.forEach((item) => {
        if (typeof this.props.handleCheckedFunction !== "function") {
          selected[item.itemId] = true;
        }
      });
      this.setState({ selectedStatus: selected });
      const sort_item = () => {
        if (typeof this.props.handleCheckedFunction !== "function") {
          // sort the item here
          console.log(this.state.items_order);
          const sorted_item = [];
          this.state.items_order.forEach((idx) => {
            sorted_item.push(this.state.items[idx]);
          });
          this.setState({ items: sorted_item });
        }
      };
      setTimeout(() => sort_item(), 1000);
    };
    setTimeout(() => mimicUpdate(), 1000);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (typeof this.props.handleCheckedFunction !== 'function') {
    //     // sort the item here
    //     console.log(this.state.items_order)
    // }
  }

  markSelected = (id, checked) => {
    this.setState((state) => {
      state.selectedStatus[id] = checked;
      return state;
    });
  };
  markHover = (id, hover) => {
    this.setState((state) => {
      state.hoverStatus[id] = hover;
      return state;
    });
  };
  render() {
    // console.log(this.state.selectedStatus)
    return (
      <div className="mapComposite">
        <div className="map">
          <DADCMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCq-BRueDRRCUgFkqTgO93mFkgBfP0hOjU&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            updateOrderFunc={this.updateItemOrder}
            mapCenter={this.props.center}
            items={this.state.items}
            selectedIds={JSON.stringify(this.state.selectedStatus)}
            hoverIds={JSON.stringify(this.state.hoverStatus)}
          />
        </div>
        <div>
          <div className="itemList">
            <MapItemList
              items={this.state.items}
              markFunction={this.markSelected}
              hoverFunction={this.markHover}
              outMarkFunction={this.props.handleCheckedFunction}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MapComposite;
