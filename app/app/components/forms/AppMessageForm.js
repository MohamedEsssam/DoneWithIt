import React from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import * as Yup from "yup";
import messageApi from "../../services/message";

import FromContainer from "./FormContainer";
import FormField from "./FormField";
import SubmitMessageButton from "./SubmitMessageButton";

const validationSchema = Yup.object().shape({
  text: Yup.string().required().label("text"),
});

function AppMessageForm({ chat }) {
  const onSubmit = async (values, { resetForm }) => {
    values["senderId"] = chat["senderId"];
    values["receiverId"] = chat["receiverId"];

    const { data: message, ok: response } = await messageApi.sendMessage(
      values
    );
    if (!response) return console.log("something error happen");

    resetForm();
  };
  return (
    <FromContainer
      initialValues={{ text: "" }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <View style={styles.container}>
        <FormField
          name="text"
          autoCorrect={true}
          iconType="message-text-outline"
          multiline
          keyboardType="default"
          placeholder="Message"
          width="80%"
          isMessage={true}
        />
        <SubmitMessageButton />
      </View>
    </FromContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    overflow: "hidden",
    paddingLeft: 5,
  },
});

export default AppMessageForm;
