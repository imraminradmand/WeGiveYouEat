import React, { useRef } from "react";
import { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { FAB } from "react-native-paper";
import { LocationObject } from "expo-location";
import { getPostInfo } from "../apiCalls/calls";
import { useIsFocused } from "@react-navigation/native";

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    marginRight: 20,
    marginBottom: 120,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 200,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Roboto-Regular",
  },
  description: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: "Roboto-Regular",
  },
  image: {
    width: "100%",
    height: 80,
  },

  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
});

const MainScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const [location, setLocation] = useState<LocationObject>();
  const [coordinates, setCoordinates] = useState<any[]>([]);
  const mapRef = useRef<any>();
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5,
      });
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    isFocused &&
      getPostInfo("T").then((data) => {
        const tmpCord: React.SetStateAction<any[]> = [];
        data.forEach((post: any) => {
          // modify api to return images too
          const singleCord = {
            latitude: post.latitude,
            longitude: post.longitude,
          };
          tmpCord.push(singleCord);
        });
        setCoordinates(tmpCord);
      });
  }, [isFocused]);

  const goToMyLocation = async () => {
    mapRef.current.animateCamera({
      center: {
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      },
    });
  };

  return (
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
        }}
      >
        <>
          {coordinates &&
            coordinates.map((post: any, _index: any) => {
              return (
                <Marker
                  key={_index}
                  coordinate={{
                    latitude: post.latitude,
                    longitude: post.longitude,
                  }}
                >
                  <Callout
                    tooltip
                    onPress={() => {
                      navigation.navigate("SinglePost");
                    }}
                  >
                    <View>
                      <View style={styles.bubble}>
                        <Text style={styles.name}>2 Kebab Skewers</Text>
                        <Text style={styles.description}>
                          1 Beef + 1 Chicken
                        </Text>
                        <Image
                          style={styles.image}
                          source={require("../assets/testPoster.jpeg")}
                        />
                      </View>
                      <View style={styles.arrowBorder}></View>
                      <View style={styles.arrow}></View>
                    </View>
                  </Callout>
                </Marker>
              );
            })}
        </>
      </MapView>

      <FAB
        style={styles.fab}
        icon={{
          source: {
            uri: "https://static-00.iconduck.com/assets.00/my-location-icon-256x256-rr7zw1f1.png",
          },
          direction: "auto",
        }}
        onPress={goToMyLocation}
      />
    </SafeAreaView>
  );
};

export default MainScreen;
