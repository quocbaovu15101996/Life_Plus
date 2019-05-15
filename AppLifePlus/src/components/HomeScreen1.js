import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, TextInput } from 'react-native';
import { scale, verticalScale } from "../userControl/Scale";

const win = Dimensions.get('window');


export default class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewHeader}>
                    <Image source={require('../../images/image1.png')} style={{ width: scale(250), height: verticalScale(250) }} />
                    <Text style={{ color: 'black', fontSize: scale(32) }}>Bạn cần tìm gì hôm nay?</Text>
                </View>
                <View style={styles.viewBody}>
                    <View style={styles.viewSearch}>
                        <View style={{ flex: 8.5, backgroundColor: 'red' }}>
                            <TextInput />
                        </View>
                        <TouchableOpacity style={{ flex: 1.5, backgroundColor: 'green', borderTopRightRadius: scale(30), borderBottomRightRadius: scale(30) }}>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewHeader: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewBody: {
        flex: 3,
        alignItems: 'center'
    },
    viewSearch: {
        width: scale(620),
        height: verticalScale(80),
        borderRadius: scale(30),
        borderColor: 'black',
        borderWidth: 1,
        flexDirection: 'row'
    },
    viewFooter: {
        width: "100%",
    }
})