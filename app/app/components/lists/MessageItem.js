import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";

import AppText from "../AppText";

function MessageItem({ message, isMine = false }) {
  return (
    <View
      style={[
        styles.container,
        {
          alignSelf: isMine ? "flex-end" : "flex-start",
          backgroundColor: isMine ? colors.blue : colors.white,
        },
      ]}
    >
      <AppText style={{ color: isMine ? colors.white : colors.black }}>
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    alignSelf: "flex-start",
    padding: 10,
    borderRadius: 15,
    marginBottom: 8,
    overflow: "hidden",
  },
});

export default MessageItem;
