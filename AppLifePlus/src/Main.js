import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HomeRouters from './routers/HomeRouters';
import store from './redux/stores';
import { Provider } from 'react-redux';


export default class Main extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <HomeRouters />
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});