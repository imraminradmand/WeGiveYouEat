import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  Button,
  TextInput,
  Keyboard,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import * as ImagePicker from "expo-image-picker";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";

import google from "../assets/loginPage/google.png";

const testArr = [
  "file:///Users/raminradmand/Library/Developer/CoreSimulator/Devices/5EFEF0B8-9CD5-4A8A-8F63-0FBEEC063C1E/data/Containers/Data/Application/7D38E662-2F99-4868-8812-032FC3CB7157/Library/Caches/ExponentExperienceData/%2540raminradmand%252FWeGiveYouEat/ImagePicker/447FB97F-791A-428F-8365-BEE7E253FAF8.jpg",
  "file:///Users/raminradmand/Library/Developer/CoreSimulator/Devices/5EFEF0B8-9CD5-4A8A-8F63-0FBEEC063C1E/data/Containers/Data/Application/7D38E662-2F99-4868-8812-032FC3CB7157/Library/Caches/ExponentExperienceData/%2540raminradmand%252FWeGiveYouEat/ImagePicker/B367DF27-5431-4A5C-A5A8-EC1048CEC065.jpg",
];

const PostScreen = () => {
  const [hasPermissions, setPermissions] = useState(false);
  const [image, setImage] = useState("");

  const [address, setAdress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.getMediaLibraryPermissionsAsync();
      setPermissions(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      result.assets.forEach((asset) => {
        setImage(asset.uri);
      });
    }
  };
  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={{ top: 20 }}>
          <Text style={styles.header}>Create New Post</Text>
        </View>
        {image && (
          <View style={styles.imageView}>
            <Image
              source={{ uri: image }}
              style={{ width: 300, height: 200, borderRadius: 10 }}
            />
          </View>
        )}
        <View style={styles.imageCarousel}>
          <CustomButton label="Upload Image" onPress={pickImage} />
        </View>

        <View style={styles.body}>
          <InputField
            label="Address"
            icon={
              <MaterialIcons
                name="home"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="email-address"
          />
          <InputField
            label="Phone"
            icon={
              <MaterialIcons
                name="phone"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="email-address"
          />
          <TextInput
            style={{
              height: 150,
              width: 300,
              padding: 10,
              top: "2%",
              borderColor: "grey",
              borderWidth: 1,
              borderRadius: 10,
            }}
            multiline={true}
            placeholder="Description"
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />
          <View style={{ top: 40 }}>
            <CustomButton
              label="Post"
              onPress={() => {
                console.log(typeof image);
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default PostScreen;

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
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  imageCarousel: {
    top: "7%",
  },
  body: {
    top: "8%",
    width: 300,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  paragraph: {
    fontSize: 15,
  },
  imageView: {
    top: "5%",
  },
});
