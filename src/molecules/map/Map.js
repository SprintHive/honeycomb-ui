/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import {compose, mapProps, setDisplayName, withProps} from "recompose";

const enhance = compose(
  setDisplayName("Map"),
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC84AwusFfZaDJ6nLXX4W6K2SrGwehBW2U&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{height: "100%"}}/>,
    containerElement: <div style={{flex: 1, width: "100%"}}/>,
    mapElement: <div style={{height: "100%"}}/>,
  }),
  withScriptjs,
  withGoogleMap,
  mapProps(({lat, lng}) => ({lat: parseFloat(lat), lng: parseFloat(lng)}))
);

const Map = ({lat, lng}) =>
  <GoogleMap
    defaultOptions={{disableDefaultUI:true}}
    defaultZoom={15}
    defaultCenter={{lat, lng}}>
    <Marker position={{lat, lng}}/>
  </GoogleMap>;

export default enhance(Map);