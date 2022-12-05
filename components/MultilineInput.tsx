import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

export default function MultilineInput({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
}: {
  label?: string;
  icon?: any;
  inputType?: any;
  keyboardType?: any;
  fieldButtonLabel?: any;
  fieldButtonFunction?: any;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}
    >
      {icon}(
      <TextInput
        placeholder={label}
        keyboardType={keyboardType}
        style={{
          flex: 1,
          paddingVertical: 0,
          height: 100,
          margin: 20,
          padding: 10,
          borderColor: "grey",
          borderWidth: 1,
        }}
        multiline={true}
      />
      )
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
