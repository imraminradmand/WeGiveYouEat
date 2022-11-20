import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import AccountDetails from "../screens/AccountDetails";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setIsAuth(true);
      }
    });
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuth ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Account" component={AccountDetails} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;