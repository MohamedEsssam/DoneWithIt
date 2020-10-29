import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import ListingFormScreen from "./app/screens/ListingFormScreen";
import ListingsScreen from "./app/screens/ListingsScreen";
import AccountScreen from "./app/screens/AccountScreen";
import ViewImageScreen from "./app/screens/ViewImageScreen";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AccountNavigator from "./app/navigation/AccountNavigator";
import navigationTheme from "./app/navigation/navigationTheme";

export default function App() {
  return <ViewImageScreen />;
}
