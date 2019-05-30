import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Picker, KeyboardAvoidingView } from 'react-native';
import Map from './Map';
import List from './List';
import { connect } from 'react-redux';
import { scale, verticalScale } from '../userControl/Scale';
import { updateMarkers } from '../redux/actions/listMarker';
import { updateListMarkers } from '../redux/actions/listMarkerSearch';

import geolib from 'geolib';

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textTimKiem: this.props.navigation.getParam('text'),
            isFirstTab: true,
            listLinhVuc: [],
            linhvuc: 'all',
            khoangcach: '100000',
            markers: [],
        }
    }
    static navigationOptions = {
        header: null,
    };
    componentDidMount() {
        //alert(JSON.stringify(this.props.location))
        this.apiGetListLinhVuc()
        // setTimeout(() => alert(JSON.stringify(this.props.listMarkers)), 2000)
    }

    changeTab(index) {
        switch (index) {
            case 0:
                this.setState({ isFirstTab: true });
                break;
            case 1:
                this.setState({ isFirstTab: false });
                break;
            default:
                break;
        }
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
                //sắp xếp theo thứ tự khoảng cách
                await responseJson.Data.sort(function (a, b) {
                    return a.distance - b.distance;
                });
                // lọc theo lựa chọn
                let data = await responseJson.Data.filter(data => {
                    if (this.state.linhvuc == 'all') {
                        return data.distance <= Number(this.state.khoangcach);
                    }
                    else
                        return data.business_line == Number(this.state.linhvuc) && data.distance <= Number(this.state.khoangcach);
                })
                this.props.updateListMarkers(responseJson.Data)
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

    async apiGetListLinhVuc() {
        let url = 'https://lifefriend.vn/api/shop/businesslinelist'
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
                // console.log('DS linh vuc', responseJson.Data)
                this.setState({
                    listLinhVuc: responseJson.Data
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
    getDistance(latitudeB, longitudeB) {
        // console.log('Vị trí B', latitudeB)
        return geolib.getDistance(this.props.location, {
            latitude: latitudeB,
            longitude: longitudeB
        });
    }
    filterMarkersDistance(value) {
        let listMarkers = this.props.listMarkers.filter(data => {
            if (this.state.linhvuc == 'all') {
                return data.distance <= Number(value);
            }
            else
                return data.distance <= Number(value) && data.business_line == Number(this.state.linhvuc);
        });
        this.props.updateMarkers(listMarkers)
    }
    filterMarkersLinhVuc(value) {
        let listMarkers = this.props.listMarkers.filter(data => {
            if (value == 'all') {
                return data && data.distance <= Number(this.state.khoangcach);
            }
            else
                return data.business_line == Number(value) && data.distance <= Number(this.state.khoangcach);
        });
        this.props.updateMarkers(listMarkers)
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    justifyContent: "center", alignItems: "center", backgroundColor: 'rgb(250,221,202)',
                    padding: scale(15), marginBottom: scale(20)
                }}>
                    <View style={{ height: scale(80), flexDirection: "row" }}>
                        <Image source={require('../../images/Lifelogo.png')} style={{ width: 98, height: 38, marginRight: 5 }} />

                        <View style={{ flex: 1, flexDirection: 'row', height: 40, width: '100%' }}>
                            <TextInput
                                style={{
                                    flex: 85, borderWidth: 1, borderColor: 'gray', borderTopLeftRadius: scale(10),
                                    borderBottomLeftRadius: scale(10), borderRightWidth: 0, backgroundColor: 'white', paddingLeft: scale(10)
                                }}
                                placeholder='Nhập tìm kiếm'
                                onChangeText={(text) => {
                                    this.setState({ textTimKiem: text })
                                }}
                                value={this.state.textTimKiem}
                                returnKeyType='search'
                                onSubmitEditing={() => this.apiList(this.state.textTimKiem)}
                            />

                            <TouchableOpacity style={{ flex: 15, backgroundColor: 'green', justifyContent: "center", alignItems: "center", borderTopRightRadius: scale(10), borderBottomRightRadius: scale(10) }}
                                onPress={() => this.apiList(this.state.textTimKiem)}
                            >
                                <Image source={require('../../images/search.png')} style={{ width: scale(40), height: scale(40) }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ height: scale(60), flexDirection: "row" }}>
                    <Picker
                        selectedValue={this.state.khoangcach}
                        onValueChange={(itemValue, itemIndex) => { this.filterMarkersDistance(itemValue); this.setState({ khoangcach: itemValue }) }}
                        style={{ height: verticalScale(50), width: scale(250) }}>
                        <Picker.Item label="Tất cả" value="100000" />
                        <Picker.Item label="Dưới 3 km" value="3000" />
                        <Picker.Item label="Dưới 2 km" value="2000" />
                        <Picker.Item label="Dưới 1 km" value="1000" />
                    </Picker>


                    <Picker
                        selectedValue={this.state.linhvuc}
                        onValueChange={(itemValue, itemIndex) => { this.filterMarkersLinhVuc(itemValue); this.setState({ linhvuc: itemValue }) }}
                        style={{ height: verticalScale(50), width: scale(300) }}>
                        <Picker.Item label='Tất cả' value='all' />
                        {this.state.listLinhVuc.map((item, index) => (
                            <Picker.Item label={item.name} value={item.id} key={item.id} />)
                        )}
                    </Picker>

                    <View style={{ flexDirection: 'row', position: 'absolute', right: 8 }}>
                        <TouchableOpacity style={{
                            width: 30, height: 30, justifyContent: "center", alignItems: "center",
                            borderColor: this.state.isFirstTab ? '#2ced42' : 'lightgrey', borderWidth: 1, marginRight: scale(10),
                            backgroundColor: this.state.isFirstTab ? 'rgba(44,237,66,0.15)' : 'transparent'
                        }}
                            onPress={() => this.changeTab(0)}>
                            {
                                this.state.isFirstTab ?
                                    (
                                        <Image source={require('../../images/iconmap_active.png')} style={{ width: 25, height: 25 }} />
                                    )
                                    :
                                    (
                                        <Image source={require('../../images/iconmap.png')} style={{ width: 25, height: 25 }} />
                                    )
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            width: 30, height: 30, justifyContent: "center", alignItems: "center",
                            borderColor: !this.state.isFirstTab ? '#2ced42' : 'lightgrey', borderWidth: 1,
                            backgroundColor: !this.state.isFirstTab ? 'rgba(44,237,66,0.15)' : 'transparent'
                        }}
                            onPress={() => this.changeTab(1)}>
                            {
                                !this.state.isFirstTab ?
                                    (
                                        <Image source={require('../../images/iconlist_active.png')} style={{ width: 25, height: 25 }} />
                                    )
                                    :
                                    (
                                        <Image source={require('../../images/iconlist.png')} style={{ width: 25, height: 25 }} />
                                    )

                            }
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 85 }}>
                    {
                        this.state.isFirstTab ? <Map navigation={this.props.navigation} /> :
                            <List navigation={this.props.navigation} />
                    }

                </View>

            </View >
        )
    }
}

const mapStateToProps = state => ({
    location: state.location.location,
    markers: state.markers.markers,
    listMarkers: state.listMarkers.listMarkers
});
export default connect(mapStateToProps, { updateMarkers, updateListMarkers })(Search);