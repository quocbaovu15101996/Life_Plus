import React, { Component } from "react";
import { AppRegistry, StyleSheet, Dimensions, Image, View, StatusBar, TouchableOpacity, Text } from "react-native";
import { scale, verticalScale } from "../userControl/Scale";
const win = Dimensions.get('window');
import MapView, { Marker } from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import geolib from 'geolib';

var IconLocation = scale(50);
const LATITUDEDELTA = 0.5;
const LONGITUDEDELTA = LATITUDEDELTA * (win.width / win.height);

class MapGuide extends Component {
    constructor(props) {
        super(props);

        this.state = {
            statusBarHeight: 5,
            distance: 0,
            latitude: null,
            longitude: null,
            error: null,
            concat: null,
            coords: [],
            region: {
                latitude: 21.013377,
                longitude: 105.7996593
            },
            x: 'false',
            // cordLatitude: 21.063377,
            // cordLongitude: 105.4996593,
            cordLatitude: Number(this.props.marker.latitude),
            cordLongitude: Number(this.props.marker.longitude),
        };
        this.mergeLot = this.mergeLot.bind(this);
    }

    componentDidMount() {
        console.log('Marker', this.props.marker)
        navigator.geolocation.getCurrentPosition(
            (position) => {
                //Tính khoảng cách

                let distance = geolib.getDistance(position.coords, {
                    latitude: this.state.cordLatitude,
                    longitude: this.state.cordLongitude
                });

                this.setState({
                    distance: distance,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });

                this.mergeLot();

            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    }
    componentWillMount() {
        setTimeout(() => this.setState({ statusBarHeight: 0 }), 500);
    }
    getDistance() {

    }
    mergeLot() {
        if (this.state.latitude != null && this.state.longitude != null && this.state.cordLatitude != null && this.state.cordLongitude != null) {
            let concatLot = this.state.latitude + "," + this.state.longitude
            let des = this.state.cordLatitude + "," + this.state.cordLongitude
            // console.log('des', des + concatLot)
            this.setState({
                concat: concatLot
            }, () => {
                this.getDirections(concatLot, des);
            });
        }

    }

    async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyDPglsw89c3aL05-qtpdfIhvbpkvcnCDrE&ver=4.7.3`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            })
            this.setState({ coords: coords })
            this.setState({ x: "true" })
            return coords
        } catch (error) {
            console.log('masuk fungsi')
            this.setState({ x: "error" })
            return error
        }
    }
    render() {

        return (
            <View style={{ width: '100%', marginTop: scale(20) }}>
                <Text style={{ color: 'black', marginLeft: 5, fontWeight: '500', fontSize: scale(30) }}>Chỉ đường</Text>
                <Text style={{ color: 'black', marginLeft: 5, fontWeight: '500', fontSize: scale(30), position: 'absolute', right: 10 }}>Cách {this.state.distance / 1000} km</Text>
                <View style={{ width: '100%', height: win.height / 1.5, paddingTop: this.state.statusBarHeight }}>
                    <MapView style={{ flex: 1 }} region={{
                        latitude: this.state.region.latitude,
                        longitude: this.state.region.longitude,
                        latitudeDelta: LATITUDEDELTA,
                        longitudeDelta: LONGITUDEDELTA
                    }}
                        // showsUserLocation={true}
                        showsMyLocationButton={true}
                    >

                        {!!this.state.latitude && !!this.state.longitude &&
                            <Marker
                                coordinate={{ "latitude": this.state.latitude, "longitude": this.state.longitude }}
                                title={"Your Location"}
                            >
                                <Image
                                    source={require('../../images/iconLocationUser.png')}
                                    style={{ height: IconLocation, width: IconLocation }}
                                />
                            </Marker>
                        }

                        {!!this.state.cordLatitude && !!this.state.cordLongitude && <Marker
                            coordinate={{ "latitude": this.state.cordLatitude, "longitude": this.state.cordLongitude }}
                            title={"Your Destination"}
                        >
                            <Image
                                source={require('../../images/iconMarker.png')}
                                style={{ height: IconLocation, width: IconLocation }}
                            />
                        </Marker>
                        }

                        {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' && <MapView.Polyline
                            coordinates={this.state.coords}
                            strokeWidth={2}
                            strokeColor="red" />
                        }

                        {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' && <MapView.Polyline
                            coordinates={[
                                { latitude: this.state.latitude, longitude: this.state.longitude },
                                { latitude: this.state.cordLatitude, longitude: this.state.cordLongitude },
                            ]}
                            strokeWidth={2}
                            strokeColor="red" />
                        }
                    </MapView>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default MapGuide;