import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Picker, KeyboardAvoidingView } from 'react-native';
import Map from './Map';
import List from './List';
import { connect } from 'react-redux';
import { scale, verticalScale } from '../userControl/Scale';
import { updateMarkers } from '../redux/actions/listMarker';

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textTimKiem: this.props.navigation.getParam('text'),
            isFirstTab: true,
            listLinhVuc: [],
            linhvuc: '',
        }
    }
    static navigationOptions = {
        header: null,
    };
    componentDidMount() {
        //alert(JSON.stringify(this.props.location))
        this.apiGetListLinhVuc()
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

    render() {
        return (

            <View style={{ flex: 1 }}>
                <View style={{ height: scale(80), flexDirection: "row", margin: 8 }}>
                    <Image source={require('../../images/Lifelogo.png')} style={{ width: 98, height: 38, marginRight: 5 }} />

                    <View style={{ flex: 1, flexDirection: 'row', height: 40, width: '100%' }}>
                        <TextInput
                            style={{ flex: 85, borderWidth: 2, borderColor: 'gray', borderTopLeftRadius: scale(10), borderBottomLeftRadius: scale(10), borderRightWidth: 0 }}
                            placeholder='Nhập tìm kiếm'
                            onChangeText={(text) => {
                                this.setState({ textTimKiem: text })
                            }}
                            value={this.state.textTimKiem}
                        />

                        <TouchableOpacity style={{ flex: 15, backgroundColor: 'green', justifyContent: "center", alignItems: "center", borderTopRightRadius: scale(10), borderBottomRightRadius: scale(10) }}
                            onPress={() => this.apiList(this.state.textTimKiem)}
                        >
                            <Image source={require('../../images/search.png')} style={{ width: 30, height: 29 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: scale(80), flexDirection: "row" }}>
                    <Picker
                        style={{ height: verticalScale(50), width: scale(250) }}>
                        <Picker.Item label="Dưới 3 km" value="3km" />
                        <Picker.Item label="Dưới 2 km" value="2km" />
                        <Picker.Item label="Dưới 1 km" value="1km" />
                    </Picker>

                    
                    <Picker style={{ height: verticalScale(50), width: scale(300) }}
                        selectedValue={this.state.linhvuc}
                        onValueChange={(itemValue, itemIndex) => this.setState({ linhvuc: itemValue })}>
                        {this.state.listLinhVuc.map((item, index) => (
                            <Picker.Item label={item.name} value={item.id} key={index} />)
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

            </View>
        )
    }
}

const mapStateToProps = state => ({
    location: state.location,
});
export default connect(mapStateToProps, { updateMarkers })(Search);