import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import HomeRouters from './routers/HomeRouters';
import store from './redux/stores';
import Provider from 'react-redux'
export default class Main extends Component {
    render() {
        return (
            // <Provider store = {store}>
                <HomeRouters />
            // </Provider>
        )
    }
}
