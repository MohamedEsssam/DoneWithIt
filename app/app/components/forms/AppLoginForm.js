import React, { useContext, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as Yup from "yup";
import jwdDecode from "jwt-decode";
import userApi from "../../services/user";
import authStorage from "../../auth/storage";

import AppScreen from "../AppScreen";
import FromContainer from "./FormContainer";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";
import FormErrorMessage from "./FormErrorMessage";
import colors from "../../config/colors";
import UserContext from "../../auth/context";

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
  const userContext = useContext(UserContext);
  const [loginFailed, setLoginFailed] = useState(false);
  const [error, setError] = useState("");
  const onSubmit = async (values) => {
    const { data: token, ok: response, status } = await userApi.login(values);
    if (status === 401) {
      setError("Verify your account.");
      return setLoginFailed(true);
    }
    if (!response) {
      setError("Invalid email or password");
      return setLoginFailed(true);
    }

    setLoginFailed(false);
    const user = jwdDecode(token);
    userContext.setUser(user);
    authStorage.storeToken(token);
  };

  return (
    <AppScreen>
      <Image
        style={styles.logo}
        source={require("../../assets/logo-red.png")}
      />
      <FromContainer
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <>
          <FormErrorMessage error={error} visible={loginFailed} />
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
