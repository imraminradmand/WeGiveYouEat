import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "../screens/MainScreen";
import SinglePostScreen from "../screens/SinglePostScreen";

const Stack = createNativeStackNavigator();

const MainScreenStackNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={MainScreen} />
      <Stack.Screen name="SinglePost" component={SinglePostScreen} />
    </Stack.Navigator>
  );
};

export default MainScreenStackNav;
