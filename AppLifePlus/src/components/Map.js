/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Polygon } from "react-native-maps";
import { scale, verticalScale } from "../userControl/Scale";
const win = Dimensions.get("window");
var IconLocation = scale(50);
const LATITUDEDELTA = 0.5;
const LONGITUDEDELTA = LATITUDEDELTA * (win.width / win.height);
export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 21.013377,
        longitude: 105.7996593
      },
      markers: []
    }
  }
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  async apiList(string) {
    let url = 'https://lifefriend.vn/api/shop/search' + '?' + 'search_content' + string
    try {
      let response = await fetch(
        url,
        {
          method: 'GET',
          headers: {
          },
        }
      )
      if (response.status == "200") {
        let responseJson = await response.json();
        this.setState({
          markers: responseJson.Data
        })
        // alert(JSON.stringify(responseJson))
        //alert(JSON.stringify(this.state.markers))
        return responseJson;
      }
      else {
        return null;
      }
    }
    catch (error) {
      console.error(error);
      return null;
    }
  }
  renderMarker(markers) {
    if (markers.length > 0)
      //console.log('Marker', markers)
      return markers.map((marker, i) => (
        //console.log('Marker', marker.latitude)
        <Marker
          coordinate={{
            latitude: Number(marker.latitude),
            longitude: Number(marker.longitude)
          }}
          title={marker.name}
          key={i}
          onPress={() =>
            this.props.navigation.navigate("LocationDetail")
          }
        >
          <Image
            source={require('../../images/iconMarker.png')}
            style={{ height: IconLocation, width: IconLocation }}
          />
        </Marker>
      )
      )
    else
      return null
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <TouchableOpacity style={{ height: 50, width: '100%', backgroundColor: 'white' }} onPress={() => this.apiList('bò')}>

        </TouchableOpacity> */}
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
            latitudeDelta: LATITUDEDELTA,
            longitudeDelta: LONGITUDEDELTA
          }}
          showsUserLocation={true}
        >
          {this.renderMarker(this.state.markers)}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
