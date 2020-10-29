import React, { useState } from "react";
import { View, StyleSheet, Image, FlatList } from "react-native";

import AppScreen from "../components/AppScreen";
import AppText from "../components/AppText";
import Items from "../components/lists/Items";
import ListItemSeparator from "../components/lists/ItemSeparatorComponent";
import colors from "../config/colors";

const myListings = [
  {
    image: require("../assets/couch.jpg"),
    title: "Couch",
    price: "350",
    id: 1,
  },
  {
    image: require("../assets/jacket.jpg"),
    title: "Red Jacket",
    price: "150",
    id: 2,
  },
  {
    image: require("../assets/jacket.jpg"),
    title: "Red Jacket",
    price: "150",
    id: 3,
  },
  {
    image: require("../assets/jacket.jpg"),
    title: "Red Jacket",
    price: "450",
    id: 4,
  },
];

function MyListingScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  return (
    <AppScreen style={styles.container}>
      <View style={styles.line}></View>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/jacket.jpg")} style={styles.image} />
      </View>
      <AppText style={styles.name}>Mohamed Essam</AppText>
      <View style={{ height: 310 }}>
        <FlatList
          style={styles.list}
          data={myListings}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <Items
              image={item.image}
              title={item.title}
              price={item.price}
              onPress={() => navigation.navigate("ListingDetails", item)}
            />
          )}
          contentContainerStyle={{
            marginBottom: 80,
          }}
          refreshing={refreshing}
          onRefresh={() => {}}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  line: {
    backgroundColor: colors.white,
    width: "100%",
    height: 1,
    position: "relative",
    top: 150,
  },
  imageContainer: {
    alignSelf: "center",
    borderRadius: 80,
    borderColor: colors.white,
    borderWidth: 4,
    position: "relative",
    top: 70,
    overflow: "hidden",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    position: "relative",
    alignSelf: "center",
    padding: 80,
    fontWeight: "700",
    fontSize: 25,
  },
  list: {
    bottom: 60,
  },
});

export default MyListingScreen;
