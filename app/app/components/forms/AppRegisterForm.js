import React from "react";
import { StyleSheet, Image, View } from "react-native";
import * as Yup from "yup";
import colors from "../../config/colors";

import AppScreen from "../AppScreen";
import FromContainer from "./FormContainer";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(3).required().label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), "null"], "Passwords don't match")
    .required()
    .label("Confirm password"),
});
function AppRegisterForm(props) {
  return (
    <AppScreen>
      <Image
        style={styles.logo}
        source={require("../../assets/logo-red.png")}
      />
      <FromContainer
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
        }}
      >
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
          <FormField
            name="confirmPassword"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            iconType="lock"
            placeholder="Confirm Password"
            textContentType="password"
          />
        </View>
        <SubmitButton title="Create an account" color={colors.primary} />
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
  inputContainer: {
    paddingBottom: 20,
  },
});

export default AppRegisterForm;
