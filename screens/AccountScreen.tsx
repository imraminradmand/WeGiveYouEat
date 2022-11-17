import React from "react";
import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountScreen = (navigation: { navigation: any }) => {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser?.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setFullName(snapshot.data()?.fullName);
        } else {
          console.log("does not exist");
        }
      });
  }, []);
  return (
    <SafeAreaView>
      <View>
        <Text>Welcome {fullName}</Text>
      </View>
    </SafeAreaView>
  );
};
