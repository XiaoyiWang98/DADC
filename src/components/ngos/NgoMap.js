import React, { Component } from "react";

import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";

class NormalNgoMap extends Component {
  render() {
    return (
      <GoogleMap
        // ref={this.getMapRef}
        defaultZoom={11}
        defaultCenter={{ lat: 34, lng: 243 }}
      />
    );
  }

  getMapRef = (mapInstance) => {
    this.map = mapInstance;
    window.map = mapInstance;
  };
}

const NgoMap = withScriptjs(withGoogleMap(NormalNgoMap));

export default NgoMap;
