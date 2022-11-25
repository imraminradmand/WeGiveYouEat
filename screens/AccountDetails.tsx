import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  LogBox,
  FlatList,
  ListRenderItem,
  ScrollView,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

import accountIcon from "../assets/AccountAvatar.png";

import React, { useState, useEffect } from "react";
import CustomButton from "../components/CustomButton";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import {
  deletePost,
  getAllPosts,
  getPostFromId,
  getUser,
  getUserPosts,
  updateUser,
} from "../apiCalls/calls";
import { err } from "react-native-svg/lib/typescript/xml";
import { TextInput } from "react-native-paper";

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

  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [refreshData, setRefreshData] = useState(false);
  const [changeName, setChangeName] = useState(false);
  const [changePhone, setChangePhone] = useState(false);

  const [nameEditDone, setNameEditDone] = useState("Edit");
  const [phoneEditDone, setPhoneEditDone] = useState("Edit");

  const { authParam } = route.params;

  const removePost = (id: number) => {
    deletePost(id);
    setRefreshData(true);
  };

  const Item = ({ data }: { data: any }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{data.postName}</Text>
        <TouchableOpacity
          style={{ position: "absolute", top: 20, left: 250 }}
          onPress={() => {
            removePost(data.id);
          }}
        >
          <Feather name="x" color={"red"} size={25} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem: ListRenderItem<any> = ({ item }: { item: any }) => (
    <Item data={item} />
  );

  useEffect(() => {
    getUserPosts(authParam.uid)
      .then((data) => setUserPosts(data))
      .catch((err) => {
        setUserPosts([]);
      });
  }, [refreshData]);

  useEffect(() => {
    getUser(authParam.uid).then((data) => {
      setEmail(data[0].email);
      setFullName(data[0].fullname);
      setPhoneNumber(data[0].phone);
    });
  }, []);

  const handleLogOut = () => {
    signOut(auth).then(() => {
      navigation.navigate("Home");
    });
  };

  const handleTest = () => {
    const body = `{"uid": "${authParam.uid}", "name": "Lao Gan Ma"}`;
    console.log(body);
    updateUser(body).catch((err) => console.log(err));
    console.log("Changed to Lao Gan Ma");
  };

  const handleEditName = () => {
    setChangeName(!changeName);
    if (nameEditDone === "Done") {
      setNameEditDone("Edit");
      alert("Name changed successfully");
      const body = `{"uid": "${authParam.uid}", "name": "${fullName}"}`;
      updateUser(body);
    } else if (nameEditDone === "Edit") {
      setNameEditDone("Done");
    }
  };

  const handleEditPhone = () => {
    setChangePhone(!changePhone);
    if (phoneEditDone === "Done") {
      setPhoneEditDone("Edit");
      alert("Phone number changed successfully");
      const body = `{"uid": "${authParam.uid}", "phone": "${phoneNumber}"}`;
      updateUser(body);
    } else if (phoneEditDone === "Edit") {
      setPhoneEditDone("Done");
    }
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback>
        <ScrollView style={styles.backg}>
          <View style={{ paddingHorizontal: 50, marginTop: 50 }}>
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

            <View style={{ alignItems: "center" }}>
              <Image source={accountIcon} style={styles.avatar} />
            </View>

            <View style={styles.infoDisplay2}>
              <Text style={styles.infoDisplay}>E-mail</Text>
            </View>
            <TextInput style={styles.infoUser} editable={false}>
              {email}
            </TextInput>

            <View style={styles.infoDisplay2}>
              <Text style={styles.infoDisplay}>Name</Text>
              <TouchableOpacity>
                <Text
                  style={styles.edit}
                  onPress={() => {
                    handleEditName();
                  }}
                >
                  {nameEditDone}
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.infoUser}
              autoComplete="name"
              textContentType="name"
              editable={changeName}
              placeholder={fullName}
              onChangeText={(text) => setFullName(text)}
            ></TextInput>

            <View style={styles.infoDisplay2}>
              <Text style={styles.infoDisplay}>Phone Number</Text>
              <TouchableOpacity>
                <Text
                  style={styles.edit}
                  onPress={() => {
                    handleEditPhone();
                  }}
                >
                  {phoneEditDone}
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.infoUser}
              editable={changePhone}
              autoComplete="tel"
              textContentType="telephoneNumber"
              keyboardType="phone-pad"
              placeholder={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            ></TextInput>

            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 22,
                fontWeight: "500",
                color: "#333",
                marginBottom: 30,
                marginTop: 50,
                alignSelf: "center",
              }}
            >
              My Posts
            </Text>

            {userPosts && <FlatList data={userPosts} renderItem={renderItem} />}

            <TouchableOpacity style={{ top: 20 }}>
              <Text style={styles.delete}>Delete Account</Text>
            </TouchableOpacity>
            <View style={{ top: 10, marginBottom: "40%" }}>
              <CustomButton label={"Sign Out"} onPress={handleLogOut} />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
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
  avatar: {
    width: 75,
    height: 75,
  },
  item: {
    backgroundColor: "#f9c2ff", // colour for my posts
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
  },
  iconView: {
    alignItems: "center",
    justifyContent: "center",
    top: 15,
  },
  edit: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "500",
    color: "red",
    marginTop: 20,
  },
  infoDisplay: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "500",
    color: "purple",
    opacity: 0.5,
    marginTop: 20,
  },
  infoUser: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "500",
    color: "black",
    top: 5,
    backgroundColor: "#fff49b",
  },
  infoDisplay2: {
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    borderColor: "#FFFFFF",
    justifyContent: "space-between",
  },
  delete: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "500",
    color: "red",
    marginBottom: 30,
    marginTop: 20,
    alignSelf: "center",
  },
});
