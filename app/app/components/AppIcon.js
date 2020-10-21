import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppIcon({
  name,
  size = 30,
  color = "#000",
  backgroundColor = "#fff",
}) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor, width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <MaterialCommunityIcons name={name} size={size / 2} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppIcon;
