import React from "react";
import { View, StyleSheet, Image } from "react-native";

import AppScreen from "./AppScreen";
import AppIcon from "./AppIcon";
import colors from "../config/colors";

function AppImageViewer({ image }) {
  return (
    <AppScreen style={styles.container}>
      <View style={styles.closeIcon}>
        <AppIcon
          name="close"
          size={70}
          backgroundColor={colors.black}
          color={colors.blue}
        />
      </View>
      <View style={styles.deleteIcon}>
        <AppIcon
          name="trash-can-outline"
          size={70}
          backgroundColor={colors.black}
          color={colors.danger}
        />
      </View>
      <Image source={image} style={styles.image} resizeMode="contain" />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
  },
  closeIcon: {
    position: "absolute",
    top: 5,
    left: 5,
  },
  deleteIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 30,
  },
});

export default AppImageViewer;
