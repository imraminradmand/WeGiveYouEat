import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import AccountDetails from "../screens/AccountDetails";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
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
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Account"
            component={AccountDetails}
            initialParams={{ authParam: user }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;
