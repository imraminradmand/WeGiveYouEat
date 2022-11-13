import { View, Dimensions, StyleSheet, Text, SafeAreaView } from "react-native";
const SignUpPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>SignUp Page</Text>
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
    alignItems: "stretch",
  },
  header: {
    fontSize: 30,
    alignItems: "center",
  },
});
