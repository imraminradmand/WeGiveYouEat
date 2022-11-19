import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import MainScreen from "./screens/MainScreen";
import PostScreen from "./screens/PostScreen";
import LoginScreen from "./screens/LoginScreen";
import { useFonts } from "expo-font";
import SignUpPage from "./screens/SignUpScreen";
import BottomBar from "./navigation/BottomBar";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <Text>Test</Text>
    </View>
  );
}
