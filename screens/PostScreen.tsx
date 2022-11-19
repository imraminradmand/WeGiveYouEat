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
import Checkbox from "expo-checkbox";
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
  const [image, setImage] = useState([]);

  const [isVeg, setVeg] = useState(false);
  const [isHalal, setHalal] = useState(false);
  const [isDrink, setDrink] = useState(false);

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.getMediaLibraryPermissionsAsync();
      setPermissions(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let imageArr: any = [];
      result.assets.forEach((asset) => {
        imageArr.push(asset.uri);
      });
      console.log(imageArr);
      setImage(imageArr);
    }
  };
  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={{ top: 20 }}>
          <Text style={styles.header}>Create New Post</Text>
        </View>
        <View style={styles.imageCarousel}>
          <CustomButton label="Upload Image(s)" onPress={pickImage} />
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
              height: 80,
              width: 300,
              padding: 10,
              borderColor: "grey",
              borderWidth: 1,
              borderRadius: 10,
            }}
            multiline={true}
            placeholder="Description"
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />

          <View style={{ alignContent: "center", top: 15 }}>
            <Text
              style={{
                alignSelf: "center",
                fontFamily: "Roboto-Regular",
                fontSize: 18,
              }}
            >
              Category
            </Text>

            <View style={styles.section}>
              <Checkbox
                style={styles.checkbox}
                value={isVeg}
                onValueChange={setVeg}
              />
              <Text style={styles.paragraph}>Vegetarian</Text>

              <Checkbox
                style={styles.checkbox}
                value={isHalal}
                onValueChange={setHalal}
              />
              <Text style={styles.paragraph}>Halal</Text>

              <Checkbox
                style={styles.checkbox}
                value={isDrink}
                onValueChange={setDrink}
              />
              <Text style={styles.paragraph}>Drink</Text>
            </View>
          </View>
          <View style={{ top: 40 }}>
            <CustomButton label="Post" onPress={() => {}} />
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
    top: 200,
  },
  body: {
    top: 220,
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
  checkbox: {
    margin: 8,
  },
});