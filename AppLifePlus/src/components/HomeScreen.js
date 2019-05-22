/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  Text,
  View, TextInput, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import { scale, verticalScale } from "../userControl/Scale";
import { connect } from 'react-redux';
import { updateLocation } from '../redux/actions/location';
import { updateMarkers } from '../redux/actions/listMarker';
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
        // this.props.store.dispatch(updateLocation(location))
        this.props.updateLocation(location);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
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
        // alert(JSON.stringify(responseJson.Data))
        this.props.updateMarkers(responseJson.Data)
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 30, }}>

        </View>

        <View style={{ height: verticalScale(100), justifyContent: "center", alignItems: "center" }}>
          <Image source={require('../../images/home.png')} style={{ width: scale(180), height: scale(160), marginBottom: scale(10) }} />
          <Text style={{ fontSize: scale(40), color: 'black', marginBottom: 10 }}>Bạn cần tìm gì hôm nay?</Text>
          <KeyboardAvoidingView behavior='padding'>
            <View style={{ flex: 1, flexDirection: 'row', width: '80%' }}>
              <TextInput
                style={{ flex: 85, borderWidth: 2, borderColor: 'gray', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderRightWidth: 0 }}
                placeholder='Nhập tìm kiếm'
                onChangeText={(text) => {
                  this.setState({ textTimKiem: text })
                }}
                value={this.state.textTimKiem}
              />
              <TouchableOpacity style={{ flex: 15, backgroundColor: 'green', justifyContent: "center", alignItems: "center", borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
                onPress={() => {
                  this.apiList(this.state.textTimKiem);
                  this.props.navigation.navigate('Search', { text: this.state.textTimKiem })
                }}>
                <Image source={require('../../images/search.png')} style={{ width: scale(60), height: scale(59), backgroundColor: 'green' }} />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>

        </View>

        <View style={{ flex: 50, alignItems: "center", position: "relative" }}>
          <View style={{ position: "absolute", bottom: 20, alignItems: "center" }}>
            <Image source={require('../../images/Lifelogo.png')} style={{ width: 100, height: 38 }} />
            <Text style={{ fontSize: 15, color: 'black' }}>Luôn song hành cùng bạn mọi lúc mọi nơi</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(null, { updateLocation, updateMarkers })(HomeScreen);