import React from "react";
import { View, StyleSheet } from "react-native";
import AppImageViewer from "../components/AppImageViewer";

function ViewImageScreen(props) {
  return <AppImageViewer image={require("../assets/chair.jpg")} />;
}

const styles = StyleSheet.create({
  container: {},
});

export default ViewImageScreen;
