import { View, Dimensions, StyleSheet, Text, SafeAreaView } from "react-native";
const PostScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>POST PAGE</Text>
    </SafeAreaView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  header: {
    fontSize: 30,
    alignItems: "center",
  },
});
