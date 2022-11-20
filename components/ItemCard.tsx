import * as React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function ItemCard(props: any) {
  return (
    <View>
      <View>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {},
  cardContent: {},
});
