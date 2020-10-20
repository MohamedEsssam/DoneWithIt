import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import AppTextInput from "./app/components/AppTextInput";

export default function App() {
  return (
    <SafeAreaView>
      <AppTextInput placeholder="username" />
    </SafeAreaView>
  );
}
