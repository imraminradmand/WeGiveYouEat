import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";

import logo from "../assets/loginPage/Logo.png";
import apple from "../assets/loginPage/apple.png";
import google from "../assets/loginPage/google.png";
import ms from "../assets/loginPage/MS.png";
import { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/auth";

const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = async (
    fullName: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string
  ) => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser?.uid)
            .set({
              fullName,
              email,
              phoneNumber,
            });
        })
        .then(() => {
          alert("user registered successfully");
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 25, marginTop: 50 }}
        >
          <View style={{ alignItems: "center" }}>
            <Image source={logo} style={styles.logo} />
          </View>

          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
              marginTop: 10,
              alignSelf: "center",
            }}
          >
            Register
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => {}}
              style={{
                borderColor: "#ddd",
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
                marginRight: 5,
              }}
            >
              <Image
                source={google}
                style={{ height: 24, width: 24, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                borderColor: "#ddd",
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
                marginRight: 5,
              }}
            >
              <Image
                source={apple}
                style={{ height: 24, width: 24, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                borderColor: "#ddd",
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <Image
                source={ms}
                style={{ height: 24, width: 24, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{ textAlign: "center", color: "#666", marginBottom: 30 }}
          >
            Or, register with email ...
          </Text>

          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}
          >
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
            <TextInput
              placeholder={"Full Name"}
              style={{ flex: 1, paddingVertical: 0 }}
              onChangeText={setFullName}
              autoCorrect={false}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}
          >
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
            <TextInput
              placeholder={"Email"}
              style={{ flex: 1, paddingVertical: 0 }}
              keyboardType="email-address"
              onChangeText={setEmail}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}
          >
            <MaterialIcons
              name="phone"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
            <TextInput
              placeholder={"Phone Number"}
              style={{ flex: 1, paddingVertical: 0 }}
              keyboardType="phone-pad"
              onChangeText={setPhoneNumber}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}
          >
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
            <TextInput
              placeholder={"Password"}
              style={{ flex: 1, paddingVertical: 0 }}
              secureTextEntry={true}
              onChangeText={setPassword}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}
          >
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
            <TextInput
              placeholder={"Confirm password"}
              style={{ flex: 1, paddingVertical: 0 }}
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
            />
          </View>

          <CustomButton
            label={"Register"}
            onPress={() => {
              registerUser(
                fullName,
                email,
                phoneNumber,
                password,
                confirmPassword
              );
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Text>Already registered?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
                {" "}
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff49b",
  },
  header: {
    fontSize: 30,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: "stretch",
  },
});
