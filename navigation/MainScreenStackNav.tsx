import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import MainScreen from "../screens/MainScreen";
import SinglePostScreen from "../screens/SinglePostScreen";

const Stack = createNativeStackNavigator();

const MainScreenStackNav = () => {
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        initialParams={{ authParam: user }}
        component={MainScreen}
      />
      <Stack.Screen name="SinglePost" component={SinglePostScreen} />
    </Stack.Navigator>
  );
};

export default MainScreenStackNav;
