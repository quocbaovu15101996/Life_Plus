/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  Text,
  View, TextInput, TouchableOpacity, KeyboardAvoidingView,
  Alert
} from 'react-native';
import { scale, verticalScale } from "../userControl/Scale";
import { connect } from 'react-redux';
import { updateLocation } from '../redux/actions/location';
import { updateMarkers } from '../redux/actions/listMarker';
import { updateListMarkers } from '../redux/actions/listMarkerSearch';
import geolib from 'geolib';



class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      textTimKiem: ''
    }
  }

  static navigationOptions = {
    header: null,
  };

  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        this.props.updateLocation(location);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );

  }

  getDistance(latitudeB, longitudeB) {
    // console.log('Vị trí B', latitudeB)
    return geolib.getDistance(this.props.location, {
      latitude: latitudeB,
      longitude: longitudeB
    });
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
        for (let i = 0; i < responseJson.Data.length; i++) {
          responseJson.Data[i].distance = this.getDistance(Number(responseJson.Data[i].latitude), Number(responseJson.Data[i].longitude));
          responseJson.Data[i].latitude = Number(responseJson.Data[i].latitude);
          responseJson.Data[i].longitude = Number(responseJson.Data[i].longitude)
        }
        await responseJson.Data.sort(function (a, b) {
          return a.distance - b.distance;
        });
        let data = await responseJson.Data.filter(data => {
          return data.distance <= 100000;
        })
        // console.log('Markers Data', data)
        //list marker để đối chiếu
        this.props.updateListMarkers(responseJson.Data)
        // list marker để chỉnh sửa thay đổi
        this.props.updateMarkers(data)
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

  _onPressSearch = () => {
    // if (this.checkNetWorking()) {
    this.apiList(this.state.textTimKiem)
    // }
    this.props.navigation.navigate('Search', { text: this.state.textTimKiem })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 30, }}>

        </View>

        <View style={{ height: verticalScale(100), justifyContent: "center", alignItems: "center" }}>
          <Image source={require('../../images/home.png')} style={{ width: scale(180), height: scale(160), marginBottom: scale(10) }} />
          <Text style={{ fontSize: scale(40), color: 'black', marginBottom: 10 }}>Bạn cần tìm gì hôm nay?</Text>
          <KeyboardAvoidingView behavior='padding'>
            <View style={{ flex: 1, flexDirection: 'row', width: '90%' }}>
              <TextInput
                style={{
                  flex: 85, borderWidth: 1, borderColor: 'gray', borderTopLeftRadius: 10, borderBottomLeftRadius: 10,
                  borderRightWidth: 0, paddingLeft: scale(10)
                }}
                placeholder='Nhập tìm kiếm'
                onChangeText={(text) => {
                  this.setState({ textTimKiem: text })
                }}
                value={this.state.textTimKiem}
                returnKeyType='search'
                onSubmitEditing={this._onPressSearch}
              />
              <TouchableOpacity style={{ flex: 15, backgroundColor: 'green', justifyContent: "center", alignItems: "center", borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
                onPress={this._onPressSearch}>
                <Image source={require('../../images/search.png')} style={{ width: scale(60), height: scale(59) }} />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>

        </View>

        <View style={{ flex: 50, alignItems: "center", position: "relative" }}>
          <View style={{ position: "absolute", bottom: 20, alignItems: "center" }}>
            <Image source={require('../../images/Lifelogo.png')} style={{ width: 98, height: 38 }} />
            <Text style={{ fontSize: 15, color: 'black' }}>Luôn song hành cùng bạn mọi lúc mọi nơi</Text>
          </View>
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  location: state.location.location,
});

export default connect(mapStateToProps, { updateLocation, updateMarkers, updateListMarkers })(HomeScreen);