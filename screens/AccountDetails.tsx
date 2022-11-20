import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  LogBox,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useState, useEffect } from "react";
import CustomButton from "../components/CustomButton";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

LogBox.ignoreAllLogs();

const AccountDetails = ({
  route,
  navigation,
}: {
  navigation: any;
  route: any;
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { authParam } = route.params;

  useEffect(() => {
    const getRefDoc = doc(db, "users", authParam.uid);
    getDoc(getRefDoc).then((snapshot) => {
      const res = snapshot.data();
      setEmail(res?.email);
      setFullName(res?.fullName);
      setPhoneNumber(res?.phone);
    });
  }, []);

  const handleLogOut = () => {
    signOut(auth).then(() => {
      navigation.navigate("Home");
    });
  };
  return (
    <SafeAreaView style={styles.backg}>
      <View style={{ paddingHorizontal: 50, marginTop: 50 }}>
        {/* <View style={{ alignItems: "center" }}>
            <Image source={logo} style={styles.logo} />
          </View> */}

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
          Account Details
        </Text>

        <View
          style={{
            flexDirection: "row",
            width: "100%",

            alignSelf: "center",
            borderColor: "#FFFFFF",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 16,
              fontWeight: "500",
              color: "purple",
              opacity: 0.5,
              marginTop: 20,
            }}
          >
            Name
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "500",
                color: "red",
                marginTop: 20,
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 16,
            fontWeight: "500",
            color: "black",
            marginLeft: 10,
          }}
        >
          {fullName}
        </Text>

        <View
          style={{
            flexDirection: "row",
            width: "100%",

            alignSelf: "center",
            borderColor: "#FFFFFF",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 16,
              fontWeight: "500",
              color: "purple",
              opacity: 0.5,
              marginTop: 20,
            }}
          >
            E-mail
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "500",
                color: "red",
                marginTop: 20,
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 16,
            fontWeight: "500",
            color: "black",
            marginLeft: 10,
          }}
        >
          {email}
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: "100%",

            alignSelf: "center",
            borderColor: "#FFFFFF",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 16,
              fontWeight: "500",
              color: "purple",
              opacity: 0.5,
              marginTop: 20,
            }}
          >
            Phone Number
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "500",
                color: "red",
                marginTop: 20,
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 16,
            fontWeight: "500",
            color: "black",
            marginLeft: 10,
          }}
        >
          {phoneNumber}
        </Text>

        <TouchableOpacity>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 16,
              fontWeight: "500",
              color: "red",
              marginBottom: 30,
              marginTop: 20,
            }}
          >
            Delete Account
          </Text>
        </TouchableOpacity>
        {/* <InputField
            label={"Email ID"}
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
            fieldButtonLabel={"Forgot?"}
            fieldButtonFunction={() => {}}
          /> */}

        <CustomButton label={"Sign Out"} onPress={handleLogOut} />
      </View>
    </SafeAreaView>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  backg: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: "#fff49b",
  },
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
