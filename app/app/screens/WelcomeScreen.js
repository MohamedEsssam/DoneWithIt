import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "../components/AppText";

function WelcomeScreen(props) {
  return (
    <View style={styles.container}>
      <AppText>hello world !</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default WelcomeScreen;
