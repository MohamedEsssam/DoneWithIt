import React from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AppScreen from "./AppScreen";
import colors from "../config/colors";

function AppImageViewer({ image }) {
  const navigation = useNavigation();
  return (
    <AppScreen style={styles.container}>
      <View style={styles.closeIcon}>
        <MaterialCommunityIcons
          name="close"
          size={40}
          color={colors.white}
          onPress={() => {
            navigation.navigate("ListingDetails");
          }}
        />
      </View>
      <View style={styles.deleteIcon}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={40}
          color={colors.danger}
          onPress={() => {
            Alert.alert(
              "Delete Image",
              "Are you sure you want delete this image ?",
              [
                { text: "Yes", onPress: () => navigation.navigate("Listings") },
                { text: "No" },
              ]
            );
          }}
        />
      </View>
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="contain"
      />
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
    left: 20,
    zIndex: 1,
  },
  deleteIcon: {
    position: "absolute",
    top: 5,
    right: 20,
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 30,
  },
});

export default AppImageViewer;
