import React from "react";
import { View, StyleSheet } from "react-native";

import AppScreen from "../components/AppScreen";
import AppListInfo from "../components/lists/AppListInfo";
import Items from "../components/lists/Items";

function ListingDetailsScreen({ navigation, route }) {
  const listings = route.params;
  return (
    <AppScreen>
      <Items
        imageUri={listings.imageUri}
        title={listings.title}
        price={listings.price}
        onPress={() =>
          navigation.navigate("ListingImage", { image: listings.imageUri })
        }
      />
      <AppListInfo
        image={require("../assets/logo-red.png")}
        title="Mohamed Essam"
        subTitle="6 Listings"
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ListingDetailsScreen;
