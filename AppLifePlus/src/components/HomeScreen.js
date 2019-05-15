/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  Text,
  View, TextInput, TouchableOpacity
} from 'react-native';

export default class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      textTimKiem: ''
    }
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 20, }}>

        </View>

        <View style={{ flex: 30, justifyContent: "center", alignItems: "center" }}>
          <Image source={require('../../images/home.png')} style={{ width: 120, height: 99, marginBottom: 10 }} />
          <Text style={{ fontSize: 20, color: 'black', marginBottom: 10 }}>Bạn cần tìm gì hôm nay?</Text>
          <View style={{ flex: 1, flexDirection: 'row', height: 50, width: '80%' }}>
            <TextInput
              style={{ flex: 85, borderWidth: 2, borderColor: 'gray', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderRightWidth: 0 }}
              placeholder='Nhập tìm kiếm'
              onChangeText={(text) => {
                this.setState({ textTimKiem: text })
              }}
              value={this.state.textTimKiem}
            />
            <TouchableOpacity style={{ flex: 15, backgroundColor: 'green', justifyContent: "center", alignItems: "center", borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
              onPress={() => this.props.navigation.navigate('Search', {text: this.state.textTimKiem})}>
              <Image source={require('../../images/search.png')} style={{ width: 40, height: 39, backgroundColor: 'green' }} />
            </TouchableOpacity>
          </View>


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
