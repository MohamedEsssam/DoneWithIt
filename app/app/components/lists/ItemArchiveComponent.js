import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

function ItemArchiveComponent({ onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="archive" size={35} color={colors.white} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "dodgerblue",
    marginTop: 10,
    width: 70,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
});

export default ItemArchiveComponent;
