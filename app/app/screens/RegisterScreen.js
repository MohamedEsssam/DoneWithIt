import React from "react";
import { ScrollView } from "react-native";

import AppRegisterForm from "../components/forms/AppRegisterForm";
import colors from "../config/colors";

function RegisterScreen(props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: colors.light }}
    >
      <AppRegisterForm />
    </ScrollView>
  );
}

export default RegisterScreen;
