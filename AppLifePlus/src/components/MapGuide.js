import React, { Component } from "react";
import { AppRegistry, StyleSheet, Dimensions, Image, View, StatusBar, TouchableOpacity } from "react-native";
import { scale, verticalScale } from "../userControl/Scale";
const win = Dimensions.get('window');
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
var IconLocation = scale(50);
const LATITUDEDELTA = 0.5;
const LONGITUDEDELTA = LATITUDEDELTA * (win.width / win.height);

class MapGuide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      concat: null,
      coords: [],
      x: 'false',
      cordLatitude: 21.063377,
      cordLongitude: 105.4996593,
    };

    this.mergeLot = this.mergeLot.bind(this);

  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this.mergeLot();
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );

  }

  mergeLot() {
    if (this.state.latitude != null && this.state.longitude != null) {
      let concatLot = this.state.latitude + "," + this.state.longitude
      this.setState({
        concat: concatLot
      }, () => {
        this.getDirections(concatLot, "-6.270565,106.759550");
      });
    }

  }

  async getDirections(startLoc, destinationLoc) {

    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyA12j1oV6VEJM4AT4r_8rRRiyjOLmGTuTo`)
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coords: coords })
      this.setState({ x: "true" })
      return coords
    } catch (error) {
      console.log('masuk fungsi')
      this.setState({ x: "error" })
      return error
    }
  }
  render() {

    return (
      <MapView style={styles.map} region={{
        latitude: 21.063377,
        longitude: 105.4996593,
        latitudeDelta: LATITUDEDELTA,
        longitudeDelta: LONGITUDEDELTA
      }}>

        {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
          coordinate={{ "latitude": this.state.latitude, "longitude": this.state.longitude }}
          title={"Your Location"}
        />}

        {!!this.state.cordLatitude && !!this.state.cordLongitude && <MapView.Marker
          coordinate={{ "latitude": this.state.cordLatitude, "longitude": this.state.cordLongitude }}
          title={"Your Destination"}
        />}

        {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' && <MapView.Polyline
          coordinates={this.state.coords}
          strokeWidth={2}
          strokeColor="red" />
        }

        {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' && <MapView.Polyline
          coordinates={[
            { latitude: this.state.latitude, longitude: this.state.longitude },
            { latitude: this.state.cordLatitude, longitude: this.state.cordLongitude },
          ]}
          strokeWidth={2}
          strokeColor="red" />
        }
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default MapGuide;