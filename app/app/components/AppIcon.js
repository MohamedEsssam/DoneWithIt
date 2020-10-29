import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

function AppIcon({
  name,
  size = 30,
  color = "#000",
  backgroundColor = "#fff",
  onPress,
}) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor, width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      {name === "dollar" ? (
        <FontAwesome name={name} color={color} size={size / 2} />
      ) : (
        <MaterialCommunityIcons
          name={name}
          color={color}
          size={size / 2}
          onPress={onPress}
        />
      )}
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
