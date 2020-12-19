import React, { useState } from "react";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import jwdDecode from "jwt-decode";
import UserContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import ListingFormScreen from "./app/screens/ListingFormScreen";
import MessageFormScreen from "./app/screens/MessageFormScreen";
import ListingsScreen from "./app/screens/ListingsScreen";
import ViewImageScreen from "./app/screens/ViewImageScreen";
import AccountScreen from "./app/screens/AccountScreen";
import AccountNavigator from "./app/navigation/AccountNavigator";
import FeedNavigator from "./app/navigation/FeedNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const getUserFromStorage = async () => {
    const token = await authStorage.getToken();
    if (!token) return;

    setUser(jwdDecode(token));
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={getUserFromStorage}
        onFinish={() => setIsReady(true)}
      />
    );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </UserContext.Provider>
  );
}
