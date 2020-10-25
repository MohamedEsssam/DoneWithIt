import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";

function PickerItem({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <AppText>{label}</AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 10,
    marginVertical: 10,
    shadowColor: colors.light,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    alignContent: "center",
    justifyContent: "center",
  },
});

export default PickerItem;
