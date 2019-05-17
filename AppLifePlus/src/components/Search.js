import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Picker } from 'react-native';
import Map from './Map';
import List from './List'

export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textTimKiem: this.props.navigation.getParam('text'),
            isFirstTab: true
        }
    }
    static navigationOptions = {
        header: null,
    };
    componentDidMount() {

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

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 8, flexDirection: "row", margin: 8 }}>
                    <Image source={require('../../images/Lifelogo.png')} style={{ width: 90, height: 38, marginRight: 5 }} />

                    <View style={{ flex: 1, flexDirection: 'row', height: 40, width: '100%' }}>
                        <TextInput
                            style={{ flex: 85, borderWidth: 2, borderColor: 'gray', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderRightWidth: 0 }}
                            placeholder='Nhập tìm kiếm'
                            onChangeText={(text) => {
                                this.setState({ textTimKiem: text })
                            }}
                            value={this.state.textTimKiem}
                        />
                        <TouchableOpacity style={{ flex: 15, backgroundColor: 'green', justifyContent: "center", alignItems: "center", borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
                        onPress={() => this.child.apiList(this.state.textTimKiem)}
                        >
                            <Image source={require('../../images/search.png')} style={{ width: 30, height: 29, backgroundColor: 'green' }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 7, flexDirection: "row" }}>
                    <Picker
                        style={{ height: 20, width: 140 }}>
                        <Picker.Item label="Duoi 3 km" value="java" />
                        <Picker.Item label="Duoi 2 km" value="js" />
                        <Picker.Item label="Duoi 1 km" value="js" />
                    </Picker>

                    <Picker
                        style={{ height: 20, width: 100 }}>
                        <Picker.Item label="JavaScript" value="java" />
                        <Picker.Item label="JS" value="js" />
                    </Picker>

                    <Text>"4" ket qua</Text>

                    <TouchableOpacity style={{width: 30, height: 30, justifyContent: "center", alignItems: "center", 
                    borderColor: 'gray', borderWidth: 1, marginRight: 5, marginLeft: 11,}}
                    onPress={() => this.changeTab(0)}>
                        <Image source={require('../../images/iconmap.png')} style={{width: 25, height: 25}} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: 30, height: 30, justifyContent: "center", alignItems: "center", 
                    borderColor: 'gray', borderWidth: 1}}
                    onPress={() => this.changeTab(1)}>
                    <Image source={require('../../images/iconlist.png')} style={{width: 25, height: 25}} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 85 }}>
                {
                    this.state.isFirstTab ? <Map onRef={ref => (this.child = ref)} navigation={this.props.navigation}/> :
                    <List onRef={ref => (this.child = ref)} navigation={this.props.navigation} />
                }
                    
                    
                </View>

            </View>
        )
    }
}