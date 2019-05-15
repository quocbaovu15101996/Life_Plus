import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import HomeScreen from '../components/HomeScreen';
import Search from '../components/Search'

const HomeNavigator = createSwitchNavigator({
    HomeScreen: { screen: HomeScreen },
});
const HomeRouters = createStackNavigator({
    // HomeNavigator,
    HomeScreen: { screen: HomeScreen },
    Search: {screen: Search}
});

export default createAppContainer(HomeRouters);