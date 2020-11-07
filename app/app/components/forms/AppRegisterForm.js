import React, { useContext, useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import * as Yup from "yup";
import jwdDecode from "jwt-decode";
import UserContext from "../../auth/context";
import userApi from "../../services/user";
import authStorage from "../../auth/storage";

import AppScreen from "../AppScreen";
import FromContainer from "./FormContainer";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";
import FormErrorMessage from "./FormErrorMessage";
import colors from "../../config/colors";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(3).required().label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), "null"], "Passwords don't match")
    .required()
    .label("Confirm password"),
});
function AppRegisterForm(props) {
  const userContext = useContext(UserContext);
  const [registerFailed, setRegisterFailed] = useState(false);
  const onSubmit = async (values) => {
    const { data: token, ok: response } = await userApi.register(values);
    if (!response) return setRegisterFailed(true);

    setRegisterFailed(false);
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
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <>
          <FormErrorMessage
            error="User is already exist"
            visible={registerFailed}
          />
          <View style={styles.inputContainer}>
            <FormField
              name="name"
              autoCorrect={false}
              clearButtonMode="always"
              iconType="account"
              keyboardType="default"
              placeholder="username"
              textContentType="username"
            />
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
  inputContainer: {
    paddingBottom: 20,
  },
});

export default AppRegisterForm;
