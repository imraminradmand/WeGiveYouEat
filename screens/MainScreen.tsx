import React, { useRef } from "react";
import { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import * as Location from 'expo-location';
import { FAB } from "react-native-paper";
import { LocationObject } from "expo-location";


const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    fab: {
        position: "absolute",
        right: 0,
        bottom: 0,
        marginRight: 20,
        marginBottom: 120
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    }
})


const MainScreen = () => {
    const [location, setLocation] = useState<LocationObject>();  
    const mapRef = useRef<any>();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
                timeInterval: 5
            });
            setLocation(location);
        })();
    }, []);

    const goToMyLocation = async () => {
        mapRef.current.animateCamera({center: {"latitude":location?.coords.latitude, "longitude": location?.coords.longitude}});
    }
    return(
        <SafeAreaView style={styles.container}>
            <MapView 
                style={styles.map} 
                provider={PROVIDER_GOOGLE}
                ref={mapRef}
                showsUserLocation={true}
                followsUserLocation={true}
                initialRegion={{
                    latitude: 51.0447,
                    longitude: -114.0719,
                    longitudeDelta: 0.09,
                    latitudeDelta: 0.04,
                }           
            }
            />
        <FAB style={styles.fab} icon="map-marker-radius" onPress={goToMyLocation}/>
        </SafeAreaView>
    )
}


export default MainScreen;