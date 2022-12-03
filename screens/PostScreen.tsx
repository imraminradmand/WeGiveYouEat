import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Keyboard,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { GOOGLE_API_KEY } from "@env";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import { useDebounce } from "../hooks/useDebounce";
import SearchBarWithAutocomplete from "../components/SearchBarWithAutoComplete";
import { addPost } from "../apiCalls/calls";

export type PredictionType = {
  description: string;
  place_id: string;
  reference: string;
  matched_substrings: any[];
  tructured_formatting: Object;
  terms: Object[];
  types: string[];
};

const PostScreen = ({ route }: { route: any }) => {
  const [hasPermissions, setPermissions] = useState(false);
  const [image, setImage] = useState("");
  const [base64, setBase64] = useState("");

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [phone, setPhone] = useState("");
  const [postName, setPostName] = useState("");
  const [desc, setDesc] = useState("");

  const [search, setSearch] = useState({ term: "", fetchPredictions: false });
  const [showPredictions, setShowPredictions] = useState(false);
  const [predictions, setPredictions] = useState<PredictionType[]>([]);

  const GOOGLE_PALCES_API_BASE_URL =
    "https://maps.googleapis.com/maps/api/place";

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
      base64: true,
    });

    if (!result.canceled) {
      result.assets.forEach((asset) => {
        setImage(asset.uri);
        setBase64(asset.base64 ? asset.base64 : "");
      });
    }
  };

  const onChangeText = async () => {
    if (search.term.trim() === "") return;
    if (!search.fetchPredictions) return;

    const apiUrl = `${GOOGLE_PALCES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_API_KEY}&input=${search.term}`;
    try {
      const result = await axios.request({
        method: "post",
        url: apiUrl,
      });
      if (result) {
        const {
          data: { predictions },
        } = result;
        setPredictions(predictions);
        setShowPredictions(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useDebounce(onChangeText, 1000, [search.term]);

  const onPredictionTapped = async (placeId: string, description: string) => {
    const apiUrl = `${GOOGLE_PALCES_API_BASE_URL}/details/json?key=${GOOGLE_API_KEY}&place_id=${placeId}`;
    try {
      const result = await axios.request({
        method: "post",
        url: apiUrl,
      });
      if (result) {
        const {
          data: {
            result: {
              geometry: { location },
            },
          },
        } = result;
        const { lat, lng } = location;
        setShowPredictions(false);
        setSearch({ term: description, fetchPredictions: false });
        setLat(lat);
        setLong(lng);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlePostToDB = () => {
    const body = `{"postName": "${postName}", "description": "${desc}", "address": "${search.term}", "longitude": ${long}, "latitude":${lat}, "phone":"${phone}", "user_uid":"${phone}", "image": "${base64}"}`;
    addPost(body).catch((err) => console.log(err));
  };
  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
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
            <SearchBarWithAutocomplete
              value={search.term}
              onChangeText={(text) => {
                setSearch({ term: text, fetchPredictions: true });
              }}
              showPredictions={showPredictions}
              predictions={predictions}
              onPredictionTapped={onPredictionTapped}
            />
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                marginBottom: 25,
                top: "5%",
                borderWidth: 3,
                borderRadius: 10,
                borderColor: "#c579c7",
                backgroundColor: "#ffff",
              }}
            >
              <MaterialIcons
                name="post-add"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
              <TextInput
                placeholder={"Post Name"}
                style={{ flex: 1, paddingVertical: 0 }}
                keyboardType="phone-pad"
                onChangeText={setPostName}
                textContentType="name"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                marginBottom: 25,
                top: "5%",
                borderWidth: 3,
                borderRadius: 10,
                borderColor: "#c579c7",
                backgroundColor: "#ffff",
              }}
            >
              <MaterialIcons
                name="phone"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
              <TextInput
                placeholder={"(###)-###-####"}
                style={{ flex: 1, paddingVertical: 0 }}
                keyboardType="phone-pad"
                onChangeText={setPhone}
                textContentType="telephoneNumber"
                autoComplete="tel"
              />
            </View>
            <TextInput
              style={{
                height: 150,
                width: 300,
                padding: 10,
                top: "2%",
                borderColor: "#c579c7",
                borderWidth: 3,
                borderRadius: 10,
                backgroundColor: "#ffff",
              }}
              multiline={true}
              placeholder="Description"
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={setDesc}
            />
            <View style={{ top: 20, marginBottom: "70%" }}>
              <CustomButton label="Post" onPress={handlePostToDB} />
            </View>
          </View>
        </ScrollView>
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
