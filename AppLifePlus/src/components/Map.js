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
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
export default class Map extends Component {
  constructor(props) {
    super(props)
    this.map = null;
    this.state = {
      statusBarHeight: 5,
      region: {
        latitude: 21.013377,
        longitude: 105.7996593
      },
      markers: [
        // {
        //   latitude: 21.013377,
        //   longitude: 105.7996593
        // },
        // {
        //   latitude: 21.023377,
        //   longitude: 105.7996593
        // },
        // {
        //   latitude: 21.013377,
        //   longitude: 105.696593
        // },
      ]
    }
  }
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  componentWillMount() {
    // show button ShowMyLocation in Map
    setTimeout(() => this.setState({ statusBarHeight: 0 }), 500);
  }
  async apiList(string) {
    let url = 'https://lifefriend.vn/api/shop/search' + '?' + 'search_content' + '=' + string
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
      return markers.map((marker, i) => (
        <Marker
          coordinate={{
            latitude: Number(marker.latitude),
            longitude: Number(marker.longitude)
          }}
          title={marker.name}
          key={i}
          onPress={() =>
            this.props.navigation.navigate("LocationDetail", { id: marker.id })
          }
        >
          {/* <Text>{marker.name}</Text> */}
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
  ZoomBounds() {
    // let listMarker = this.state.markers;
    // console.log(listMarker)
    // listMarker.push()
    // this.map.fitToCoordinates(this.state.markers, {
    //   edgePadding: DEFAULT_PADDING,
    //   animated: true
    // });
  }
  render() {
    return (
      <View style={{ flex: 1, paddingTop: this.state.statusBarHeight }}>
        <Text style={{ color: 'black', fontSize: scale(28), marginBottom: verticalScale(10) }}>{this.state.markers.length} kết quả</Text>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          style={{ flex: 1 }}
          region={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
            latitudeDelta: LATITUDEDELTA,
            longitudeDelta: LONGITUDEDELTA
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {this.renderMarker(this.state.markers)}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
