import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import AppAddListingButton from "../components/lists/AppAddListingButton";
import AppListingFormScreen from "../screens/ListingFormScreen";

const Tap = createBottomTabNavigator();
const AppNavigator = () => (
  <Tap.Navigator>
    <Tap.Screen
      name="Feed"
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tap.Screen
      name="ListingEdit"
      component={AppListingFormScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <AppAddListingButton
            onPress={() => navigation.navigate("ListingEdit")}
          />
        ),
      })}
    />
    <Tap.Screen
      name="Account"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="account" size={size} color={color} />
        ),
      }}
    />
  </Tap.Navigator>
);

export default AppNavigator;
