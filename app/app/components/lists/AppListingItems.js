import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import Items from "./Items";
import AppScreen from "../AppScreen";
import ListItemSeparator from "./ItemSeparatorComponent";

function AppListingItems({ items }) {
  return (
    <AppScreen>
      <FlatList
        data={items}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => (
          <Items
            image={item.image}
            title={item.title}
            price={item.price}
            onPress={() => console.log(item)}
          />
        )}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppListingItems;
