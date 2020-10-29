import React from "react";
import { View, StyleSheet } from "react-native";
import AppImageViewer from "../components/AppImageViewer";

function ViewImageScreen({ route }) {
  const image = route.params.image;
  return <AppImageViewer image={image} />;
}

const styles = StyleSheet.create({
  container: {},
});

export default ViewImageScreen;
