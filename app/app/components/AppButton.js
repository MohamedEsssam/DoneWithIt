import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";

function AppButton({ title, color, onPress, ...otherProps }) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      onPress={onPress}
    >
      <AppText style={styles.text}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 25,
    marginTop: 10,
  },
  text: {
    color: colors.white,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
