/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import {Icon} from 'native-base'
import { scale, verticalScale } from "../userControl/Scale";
import { connect } from 'react-redux';

const win = Dimensions.get("window");

var iconSize = scale(80)
var titleSize = scale(38)
var textConlai = scale(28)
var khungHeight = verticalScale(140)

class List extends Component {
  constructor(props) {
    super(props)
  }


  _renderItem = ({ item }) => (
    <View>
    <View style={{height: 1, width: '100%', backgroundColor: 'rgba(169,209,142,0.5)'}}></View>
    <TouchableOpacity key={item.id} style={{
      backgroundColor: 'white', width: '95%', flexDirection: "row", paddingTop: scale(15), paddingBottom: scale(15)
    }} onPress={() => this.props.navigation.navigate('LocationDetail', { id: item.id })} >
      <View style={{ flex: 35, justifyContent: "center", alignItems: "center" }} >
        <Image source={{
          uri:
            item.avatar
        }} style={{ width: scale(210), height: scale(160) }} />
      </View>

      <View style={{ flex: 60, justifyContent: "center" }}>
        <Text style={{ color: 'black', fontSize: titleSize, marginBottom: scale(10) }}>{item.name}</Text>
        <View style={{flexDirection: "row", alignItems: "center", marginBottom: scale(10)}}>
          <Icon name='ios-call' style={{width: scale(40), height: scale(55), marginRight: scale(10)}} />
          <Text style={{ fontSize: textConlai, color: 'grey' }} >{item.phone_number}</Text>
        </View>

        <View style={{flexDirection: "row", alignItems: "center", marginBottom: scale(10)}}>
          <Icon name='pin' style={{width: scale(40), height: scale(55), marginRight: scale(10)}} />
          <Text style={{ fontSize: textConlai, color: 'grey' }} numberOfLines={1} >{item.street_address}</Text>
        </View>
        
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Icon name='ios-cart' style={{width: scale(40), height: scale(55), marginRight: scale(10)}} />
          <Text style={{ fontSize: textConlai, color: 'grey' }} numberOfLines={1} >{item.business_line_text}</Text>
        </View>
        
      </View>
      <View style={{flex: 5}}></View>
    </TouchableOpacity>
    </View>
  )

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={{ color: 'black', fontSize: scale(24), marginBottom: verticalScale(10), marginLeft: scale(10) }}>
          "{this.props.markers.length}" kết quả
        </Text>
        {/* <View> */}
          <FlatList
            data={this.props.markers}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={this._renderItem}
            numColumns={1}
          />
          <View style={{height: 1, width: '100%', backgroundColor: 'rgba(169,209,142,0.5)'}}></View>
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

const mapStateToProps = state => ({
  markers: state.markers.markers,
});
export default connect(mapStateToProps, null)(List);