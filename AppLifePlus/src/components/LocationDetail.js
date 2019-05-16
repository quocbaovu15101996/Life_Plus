import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, TextInput, ImageBackground, ScrollView } from 'react-native';
import { scale, verticalScale } from "../userControl/Scale";
import MapGuide from './MapGuide';
import MapView from 'react-native-maps';
const win = Dimensions.get('window');
const LATITUDEDELTA = 0.5;
const LONGITUDEDELTA = LATITUDEDELTA * (win.width / win.height);
export default class LocationDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // marker: this.props.navigation.getParam('marker')
        }
    }

    static navigationOptions = {
        header: null,
    };
    componentWillMount() {
        // console.log('Marker', this.props.navigation.getParam('marker'))
    }

    render() {
        let data = this.props.navigation.getParam('marker')
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ margin: scale(10) }}>
                        <Image source={require('../../images/Lifelogo.png')} style={{ width: scale(180), height: verticalScale(75), marginRight: 5 }} />
                        <TouchableOpacity style={{ position: 'absolute', right: 5, top: scale(10) }}
                            onPress={() => this.props.navigation.goBack(null)}
                        >
                            <Text style={{ color: 'black', fontSize: scale(28) }}>Back</Text>
                        </TouchableOpacity>

                        <View style={{ width: '100%', marginTop: scale(20) }}>
                            <ImageBackground source={{ uri: data.avatar }} style={{ width: '100%', height: win.height / 2 }}>
                                <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)', width: '100%' }}>
                                    <Text style={{ color: '#00FF7F', fontSize: scale(32), marginLeft: 10 }}>{data.name}</Text>
                                    <View>
                                        <Text style={{ color: 'black', fontSize: scale(26), marginLeft: 10 }}>{data.phone_number}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: 'black', fontSize: scale(26), marginLeft: 10 }}>{data.street_address}</Text>
                                    </View>
                                </View>
                            </ImageBackground>

                        </View>

                        <View style={{ width: '100%', marginTop: scale(20) }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 2, height: verticalScale(70), backgroundColor: 'rgba(222, 235, 247, 0.8)', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', marginLeft: 5 }}>Thương Hiệu</Text>
                                </View>
                                <View style={{ flex: 3, height: verticalScale(70), backgroundColor: 'rgba(239, 245, 251, 0.6)', justifyContent: 'center' }}>

                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: scale(10) }}>
                                <View style={{ flex: 2, height: verticalScale(70), backgroundColor: 'rgba(222, 235, 247, 0.8)', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', marginLeft: 5 }}>Loại kinh doanh</Text>
                                </View>
                                <View style={{ flex: 3, height: verticalScale(70), backgroundColor: 'rgba(239, 245, 251, 0.6)', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', marginLeft: 5 }}>{data.business_line_text}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: scale(10) }}>
                                <View style={{ flex: 2, height: verticalScale(70), backgroundColor: 'rgba(222, 235, 247, 0.8)', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', marginLeft: 5 }}>Mặt hàng, sản phẩm</Text>
                                </View>
                                <View style={{ flex: 3, height: verticalScale(70), backgroundColor: 'rgba(239, 245, 251, 0.6)', justifyContent: 'center' }}>

                                </View>
                            </View>
                        </View>

                        <View style={{ width: '100%', marginTop: scale(20) }}>
                            <Text style={{ color: 'black', marginLeft: 5, fontWeight: '500', fontSize: scale(30) }}>Chỉ đường</Text>
                            <Text style={{ color: 'black', marginLeft: 5, fontWeight: '500', fontSize: scale(30), position: 'absolute', right: 10 }}>Cách</Text>
                            <View style={{ width: '100%', height: win.height / 1.5 }}>
                                <MapGuide />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}