import React from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../../config/colors";
import AppText from "../AppText";

function Items({ imageUri, title, price, onPress, disabled = false }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{title}</AppText>
            <AppText style={styles.price}>{"$" + price}</AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: colors.light,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    padding: 15,
    paddingVertical: 5,
  },
  card: {
    borderRadius: 20,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 7,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
  },
});

export default Items;
