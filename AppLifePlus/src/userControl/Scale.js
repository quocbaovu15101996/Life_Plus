import React, { Component } from "react";
import {Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 720;
const guidelineBaseHeight = 1280;

const scale = size => width / guidelineBaseWidth * size; //fontSize, width
const verticalScale = size => height / guidelineBaseHeight * size;              // getHeight screen
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor; // padding 

export {scale, verticalScale, moderateScale};

// https://stackoverflow.com/questions/33628677/react-native-responsive-font-size