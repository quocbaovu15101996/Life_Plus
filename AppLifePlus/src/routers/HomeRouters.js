import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import HomeScreen from '../components/HomeScreen';
import Search from '../components/Search'
import LocationDetail from '../components/LocationDetail';
const HomeNavigator = createSwitchNavigator({
    HomeScreen: { screen: HomeScreen },
});
const HomeRouters = createStackNavigator({
    // HomeNavigator,
    HomeScreen: { screen: HomeScreen },
    Search: {screen: Search},
    LocationDetail: {screen: LocationDetail}
});

export default createAppContainer(HomeRouters);