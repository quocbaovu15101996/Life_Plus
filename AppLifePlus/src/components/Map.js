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
import { connect } from 'react-redux';
import store from '../redux/stores';

const win = Dimensions.get("window");
var IconLocation = scale(50);
const padding = scale(60)
const LATITUDEDELTA = 0.2;
const LONGITUDEDELTA = LATITUDEDELTA * (win.width / win.height);
const DEFAULT_PADDING = { top: padding, right: padding, bottom: padding * 1.5, left: padding };
class Map extends Component {
  constructor(props) {
    super(props)
    this.map = null;
    this.state = {
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
  componentWillMount() {
    // show button ShowMyLocation in Map
  }

  renderMarker(markers) {
    if (markers == null)
      return null
    else
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
  }
  ZoomBounds() {
    let listMarker = this.props.markers;
    listMarker.push(this.props.location)
    console.log(listMarker)
    setTimeout(() => {
      this.map.fitToCoordinates(this.props.markers, {
        edgePadding: DEFAULT_PADDING,
        animated: true
      });
    }, 1500)
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          style={{ width: '100%', height: '107%' }}
          region={{
            latitude: this.props.location.latitude,
            longitude: this.props.location.longitude,
            latitudeDelta: LATITUDEDELTA,
            longitudeDelta: LONGITUDEDELTA
          }}
        // showsUserLocation={true}
        // showsMyLocationButton={true}
        // onMapReady={() =>this.ZoomBounds()}
        >
          {!!this.props.location.latitude && !!this.props.location.longitude &&
            <Marker
              coordinate={{ "latitude": this.props.location.latitude, "longitude": this.props.location.longitude }}
              title={"Your Location"}
            >
              <Image
                source={require('../../images/iconLocationUser.png')}
                style={{ height: IconLocation + scale(10), width: IconLocation }}
              />
            </Marker>
          }
          {
            this.renderMarker(this.props.markers)
          }
        </MapView>
        <View style={{ position: 'absolute', left: scale(15), top: scale(15), backgroundColor: 'rgba(255,255,255, 0.85)', justifyContent: 'center', height: scale(40) }}>
          <Text style={{fontSize: scale(24), marginBottom: verticalScale(10), marginLeft: scale(5), marginTop: scale(5), marginRight: scale(5)}}>
          <Text style={{color: 'black', fontWeight: '500',fontSize: scale(28),}}>{this.props.markers.length} </Text> kết quả
          </Text>
        </View>
        <View style={{ position: 'absolute', right: scale(15), top: scale(15), backgroundColor: 'rgba(255,255,255, 0.8)', }}>
          <TouchableOpacity onPress={() => this.setState({ latitude: this.props.location.latitude, longitude: this.props.location.longitude })}>
            <Image source={require('../../images/iconTargetLocation.png')} style={{ height: scale(40), width: scale(40) }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

const mapStateToProps = state => ({
  markers: state.markers.markers,
  location: state.location.location
});

export default connect(mapStateToProps, null)(Map);