import {
  TextInput,
  View,
  Dimensions,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import logo from "../assets/loginPage/Logo.png";
import apple from "../assets/loginPage/apple.png";
import google from "../assets/loginPage/google.png";
import ms from "../assets/loginPage/MS.png";

import CustomButton from "../components/CustomButton";
import { useEffect, useState } from "react";

import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [accessToekn, setAccessToken] = useState<any>();
  const [userInfo, setUserInfo] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    expoClientId: WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type == "success") {
      setAccessToken(response.authentication?.accessToken);
    }
  }, [response]);

  const getUserData = async () => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToekn}` },
      }
    );

    userInfoResponse.json().then((data) => {
      console.log("------------------------------------------\n", data);
      // setUserInfo(data);
    });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            navigation.navigate("Home");
          }
        });

        return unsubscribe;
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleGoogleLogin = () => {
    promptAsync({ showInRecents: true });
    getUserData();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 50, marginTop: 150 }}>
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
            marginTop: 20,
            alignSelf: "center",
          }}
        >
          Login
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
            textContentType="emailAddress"
            autoComplete="email"
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
            textContentType="password"
            autoComplete="password"
          />
          <TouchableOpacity onPress={() => {}}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>Forgot?</Text>
          </TouchableOpacity>
        </View>

        <CustomButton label={"Login"} onPress={handleLogin} />

        <Text style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={handleGoogleLogin}
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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
              {" "}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    fontFamily: "Roboto-Regular",
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: "stretch",
  },
  logoContainer: {
    marginTop: 100,
  },
});
