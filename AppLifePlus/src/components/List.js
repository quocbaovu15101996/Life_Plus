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
import { connect } from 'react-redux';

const win = Dimensions.get("window");

var iconSize = scale(80)
var titleSize = scale(26)
var textConlai = scale(22)
var khungHeight = verticalScale(140)

class List extends Component {
  constructor(props) {
    super(props)
  }


  _renderItem = ({ item }) => (
    <TouchableOpacity key={item.id} style={{
        backgroundColor: 'white', width: '95%', borderBottomColor: 'lightgrey', borderBottomWidth: 1, borderRightColor: 'lightgrey', 
        borderRightWidth: 1, height: khungHeight, flexDirection: "row", marginBottom: 10
    }} onPress={() => this.props.navigation.navigate('LocationDetail', { id: item.id })} >
        <View style={{ flex: 30, justifyContent: "center", alignItems: "center" }} >
            <Image source={{ uri:
                item.avatar }} style={{width: scale(150), height: scale(100)}}/>
        </View>

        <View style={{ flex: 70, justifyContent: "center" }}>
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
        <Text style={{color:'black', fontSize: scale(28), marginBottom: verticalScale(10), marginLeft: scale(10)}}>
          "{this.props.markers.length}" kết quả
        </Text>
        <FlatList
            data={this.props.markers}
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

const mapStateToProps = state => ({
  markers: state.markers.markers,
});
export default connect(mapStateToProps, null)(List);