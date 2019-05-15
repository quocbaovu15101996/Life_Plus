import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, TextInput } from 'react-native';
import { scale, verticalScale } from "../userControl/Scale";

const win = Dimensions.get('window');


export default class LocationDetail extends Component {
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <View style={{flex: 1}}>
                <Text>Detail Location</Text>
            </View>
        )
    }
}