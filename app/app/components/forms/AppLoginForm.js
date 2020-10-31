import React from "react";
import { View, Image, StyleSheet } from "react-native";
import * as Yup from "yup";

import AppScreen from "../AppScreen";
import FromContainer from "./FormContainer";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";
import colors from "../../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter valid email")
    .required("Email is required")
    .label("Email"),
  password: Yup.string()
    .required("Password is required")
    .min(3)
    .label("Password"),
});

function AppLoginForm(props) {
  return (
    <AppScreen>
      <Image
        style={styles.logo}
        source={require("../../assets/logo-red.png")}
      />
      <FromContainer
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
        }}
      >
        <>
          <View style={styles.inputContainer}>
            <FormField
              name="email"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              iconType="email"
              keyboardType="email-address"
              placeholder="Email"
              textContentType="emailAddress"
            />
            <FormField
              name="password"
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              iconType="lock"
              placeholder="Password"
              textContentType="password"
            />
          </View>
          <SubmitButton title="Sign in" color={colors.primary} />
        </>
      </FromContainer>
    </AppScreen>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 40,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    color: colors.white,
    shadowColor: colors.medium,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    paddingBottom: 20,
  },
  inputContainer: {
    paddingBottom: 20,
  },
});
export default AppLoginForm;
