import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useFormikContext } from "formik";

import AppIcon from "../AppIcon";
import colors from "../../config/colors";

function SubmitMessageButton({ color }) {
  const { handleSubmit } = useFormikContext();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      onPress={handleSubmit}
    >
      <AppIcon
        name="send"
        color={colors.white}
        backgroundColor={colors.primary}
        size={50}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    paddingLeft: 15,
  },
});

export default SubmitMessageButton;
