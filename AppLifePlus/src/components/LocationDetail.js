import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, TextInput, ImageBackground, ScrollView, Linking } from 'react-native';
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
            id: this.props.navigation.getParam('id'),
            data: {}
        }
    }

    static navigationOptions = {
        header: null,
    };
    componentWillMount() {
        // console.log('Marker', this.props.navigation.getParam('marker'))
    }
    componentDidMount() {
        this.apiList(this.state.id)
    }
    async apiList(id) {
        let url = 'https://lifefriend.vn/api/shop/shopdetail/' + id
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
                    data: responseJson.Data[0]
                })
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
        if (this.state.data != null) {
            let data = this.state.data
            return (
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <View style={{}}>
                            <View style={{ width: '100%', paddingTop: scale(15), paddingBottom: scale(15), backgroundColor: 'rgb(250,221,202)', justifyContent: "center" }}>
                                <Image source={require('../../images/Lifelogo.png')} style={{ width: 98, height: 38, marginLeft: 10 }} />
                                <TouchableOpacity style={{ position: 'absolute', right: 10 }}
                                    onPress={() => this.props.navigation.goBack(null)}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                                        <Image source={require('../../images/iconBack.png')} style={{ width: scale(50), height: verticalScale(50) }} />
                                        <Text style={{ color: 'black', fontSize: scale(28) }}>Back</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{width: win.width, height: win.height / 3, marginTop: scale(20), alignItems: "center" }}>
                                <ImageBackground source={{ uri: data.avatar }} style={{ width: scale(680), height: win.height / 3 }}>
                                    <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'rgba(255,255,255, 0.85)', width: '100%' }}>
                                        <Text style={{ color: '#00FF7F', fontSize: scale(32), marginLeft: 10 }}>{data.shop_name}</Text>

                                        <View>
                                            <Text onPress={() => { Linking.openURL(`tel:${data.phone_number}`) }}
                                                style={{ color: 'blue', fontSize: scale(26), marginLeft: 10 }}>{data.phone_number}</Text>
                                        </View>
                                        <View style={{ marginBottom: 5 }}>
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
                                        <Text style={{ color: 'black', marginLeft: 5 }}>{data.shop_brand}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: scale(5) }}>
                                    <View style={{ flex: 2, height: verticalScale(70), backgroundColor: 'rgba(222, 235, 247, 0.8)', justifyContent: 'center' }}>
                                        <Text style={{ color: 'black', marginLeft: 5 }}>Loại kinh doanh</Text>
                                    </View>
                                    <View style={{ flex: 3, height: verticalScale(70), backgroundColor: 'rgba(239, 245, 251, 0.6)', justifyContent: 'center' }}>
                                        <Text style={{ color: 'black', marginLeft: 5 }}>{data.business_line}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: scale(5) }}>
                                    <View style={{ flex: 2, height: verticalScale(70), backgroundColor: 'rgba(222, 235, 247, 0.8)', justifyContent: 'center' }}>
                                        <Text style={{ color: 'black', marginLeft: 5 }}>Mặt hàng, sản phẩm</Text>
                                    </View>
                                    <View style={{ flex: 3, height: verticalScale(70), backgroundColor: 'rgba(239, 245, 251, 0.6)', justifyContent: 'center' }}>
                                        <Text style={{ color: 'black', marginLeft: 5 }} numberOfLines={2}>{data.selling_products_text}</Text>
                                    </View>
                                </View>
                            </View>

                            {data.longitude == null ? null : (
                                <MapGuide marker={data} />
                            )
                            }
                        </View>
                    </ScrollView>
                </View>
            )
        }
        else
            return (<View>
                {this.props.navigation.goBack(null) && alert('Không có dữ liệu')}
                {/* <Text>Loading ...</Text> */}
            </View>)
    }
}