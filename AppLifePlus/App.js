/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Polygon } from "react-native-maps";
const win = Dimensions.get("window");
const LATITUDEDELTA = 0.5;
const LONGITUDEDELTA = LATITUDEDELTA * (win.width / win.height);
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 21.110085,
        longitude: 106.095694
      },
    }
  }
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: this.state.region.latitude,
          longitude: this.state.region.longitude,
          latitudeDelta: LATITUDEDELTA,
          longitudeDelta: LONGITUDEDELTA
        }}
      >

      </MapView>
    );
  }
}

const styles = StyleSheet.create({

});
