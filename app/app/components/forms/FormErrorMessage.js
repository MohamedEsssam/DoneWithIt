import React from "react";
import { StyleSheet } from "react-native";

import AppText from "../AppText";

function FormErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <AppText style={styles.error}>{error}</AppText>;
}

const styles = StyleSheet.create({
  error: { color: "red", paddingLeft: 15, fontSize: 15 },
});

export default FormErrorMessage;
