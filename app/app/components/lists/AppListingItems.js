import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Items from "./Items";
import AppScreen from "../AppScreen";
import ListItemSeparator from "./ItemSeparatorComponent";

function AppListingItems({ items }) {
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();
  return (
    <AppScreen>
      <FlatList
        data={items}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.listingId.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => (
          <Items
            imageUri={`http://192.168.1.12:9000/listingImage-${item.listingId}`}
            title={item.title}
            price={item.price}
            onPress={() => navigation.navigate("ListingDetails", item)}
          />
        )}
        refreshing={refreshing}
        onRefresh={() => {}}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppListingItems;
