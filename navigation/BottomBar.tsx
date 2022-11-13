import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import MainScreen from "../screens/MainScreen";
import PostScreen from "../screens/PostScreen";
import LoginScreen from "../screens/LoginScreen";

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

const Tab = createBottomTabNavigator();

const BottomBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "#AD40AF" },
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "yellow",
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={({ route }) => ({
          tabBarStyle: {
            backgroundColor: "#AD40AF",
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: "yellow" },
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBar;
