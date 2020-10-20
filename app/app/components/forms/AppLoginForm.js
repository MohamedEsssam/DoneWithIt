import React from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import * as Yup from "yup";

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
    <SafeAreaView>
      <Image
        style={styles.logo}
        source={require("../../assets/logo-red.png")}
      />
      <FromContainer
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <>
          <FormField
            name="email"
            autoCapitalize="none"
            autoCorrect={false}
            iconName="email"
            keyboardType="email-address"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            name="password"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            iconName="lock"
            placeholder="Password"
            textContentType="password"
          />
          <SubmitButton title="Sign in" color={colors.primary} />
        </>
      </FromContainer>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
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
});
export default AppLoginForm;
