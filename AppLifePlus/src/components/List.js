/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import { scale, verticalScale } from "../userControl/Scale";
const win = Dimensions.get("window");

var iconSize = scale(80)
var titleSize = scale(26)
var textConlai = scale(22)
var khungHeight = verticalScale(140)

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listData: []
    }
  }
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
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
            listData: responseJson.Data
        })
        // alert(JSON.stringify(responseJson))
        // alert(JSON.stringify(this.state.markers))
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

  _renderItem = ({ item }) => (
    <TouchableOpacity key={item.id} style={{
        backgroundColor: 'white', width: '95%', borderBottomColor: 'lightgrey', borderBottomWidth: 1, borderRightColor: 'lightgrey', 
        borderRightWidth: 1, height: khungHeight, flexDirection: "row", marginBottom: 10
    }} onPress={() => this.props.navigation.navigate('', { id: item.id })} >
        <View style={{ flex: 35, justifyContent: "center", alignItems: "center" }} >
            <Image source={{ uri:
                item.avatar }} style={{width: scale(150), height: scale(100)}}/>
        </View>

        <View style={{ flex: 65, justifyContent: "center" }}>
            {/* <Text style={{color: item.isRead ? 'black' : 'grey', fontSize: titleSize}}>{item.title}</Text> */}
            <Text style={{ color: 'black', fontSize: titleSize }}>{item.name}</Text>
            <Text style={{ fontSize: textConlai, color: 'grey' }} >{item.phone_number}</Text>
            <Text style={{ fontSize: textConlai, color: 'grey' }} >{item.street_address}</Text>
            <Text style={{ fontSize: textConlai, color: 'grey' }} >{item.business_line_text}</Text>
        </View>
    </TouchableOpacity>
)

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
            data={this.state.listData}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={this._renderItem}
            numColumns={1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});