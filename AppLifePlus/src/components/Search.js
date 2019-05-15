import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Picker } from 'react-native';
// import {Icon} from 'native-base'

// import List from './list'

export default class Search extends Component {

    static navigationOptions = {
        header: null,
    };
    
    render() {
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 8, flexDirection: "row", margin: 8,}}>
                    <Image source={require('../../images/Lifelogo.png')} style={{width:90, height:38, marginRight: 5}} />
                    
                    <View style={{flex:1, flexDirection:'row', height: 40, width:'100%'}}>
                        <TextInput
                        style={{flex:85, borderWidth: 2, borderColor: 'gray', borderTopLeftRadius:10, borderBottomLeftRadius: 10, borderRightWidth: 0}}
                        placeholder='Nhập tìm kiếm'/>
                        <TouchableOpacity style={{flex: 15, backgroundColor: 'green', justifyContent: "center", alignItems: "center", borderTopRightRadius: 10, borderBottomRightRadius: 10}}>
                        <Image source={require('../../images/search.png')} style={{width:30, height:29, backgroundColor: 'green'}} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flex: 7, flexDirection: "row"}}>
                    <Picker
                        style={{height: 20, width: 140}}>
                        <Picker.Item label="Duoi 3 km" value="java" />
                        <Picker.Item label="Duoi 2 km" value="js" />
                        <Picker.Item label="Duoi 1 km" value="js" />
                    </Picker>

                    <Picker
                        style={{height: 20, width: 100}}>
                        <Picker.Item label="JavaScript" value="java" />
                        <Picker.Item label="JS" value="js" />
                    </Picker>

                    <Text>"4" ket qua</Text>

                    {/* <TouchableOpacity style={{width: 30, height: 30, justifyContent: "center", alignItems: "center", borderColor: 'gray', borderWidth: 1, marginRight: 5, marginLeft: 11,}}>
                        <Icon name='map' style={{color: 'gray'}} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: 30, height: 30, justifyContent: "center", alignItems: "center", borderColor: 'gray', borderWidth: 1}}>
                        <Icon name='document' style={{color: 'gray'}} />
                    </TouchableOpacity> */}
                    
                </View>

                 <View style={{flex:85, margin: 10, backgroundColor: 'red'}}>
            
                </View> 

            </View>
        )
    }
}