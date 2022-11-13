import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
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

const SignUpPage = ({ navigaton }: { navigaton: any }) => {
  return (
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

        <Text style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>
          Or, register with email ...
        </Text>

        <InputField
          label={"Full Name"}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />

        <InputField
          label={"Email"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
        />

        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        />

        <InputField
          label={"Confirm Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        />

        <CustomButton label={"Register"} onPress={() => {}} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpPage;

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
