import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

import MainScreen from "../screens/MainScreen";
import PostScreen from "../screens/PostScreen";
import AuthStack from "../navigation/AuthNavigator";

import Feather from "react-native-vector-icons/Feather";
import { View, StyleSheet } from "react-native";
import LoginScreen from "../screens/LoginScreen";

const Tab = createBottomTabNavigator();

const BottomBar = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function handleAuthChange(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      handleAuthChange(user);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#AD40AF",
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 15,
          height: 80,
        },
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "yellow",
      }}
    >
      {user ? (
        <>
          <Tab.Screen
            name="Home"
            component={MainScreen}
            options={() => ({
              tabBarIcon: ({ color, size }) => (
                <View style={styles.iconView}>
                  <Feather name="map" color={color} size={size} />
                </View>
              ),
            })}
          />
          <Tab.Screen
            name="Post"
            component={PostScreen}
            options={{
              tabBarBadgeStyle: { backgroundColor: "yellow" },
              tabBarIcon: ({ color, size }) => (
                <View style={styles.iconView}>
                  <Feather name="plus-circle" color={color} size={50} />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="LoginFlow"
            component={AuthStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <View style={styles.iconView}>
                  <Feather name="user" color={color} size={size} />
                </View>
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Home"
            component={MainScreen}
            options={() => ({
              tabBarIcon: ({ color, size }) => (
                <View style={styles.iconView}>
                  <Feather name="map" color={color} size={size} />
                </View>
              ),
            })}
          />
          <Tab.Screen
            name="LoginFlow"
            component={AuthStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <View style={styles.iconView}>
                  <Feather name="user" color={color} size={size} />
                </View>
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  iconView: {
    alignItems: "center",
    justifyContent: "center",
    top: 15,
  },
});
