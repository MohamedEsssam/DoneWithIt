import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Image, FlatList } from "react-native";
import UserContext from "../auth/context";
import listingApi from "../services/listings";

import AppScreen from "../components/AppScreen";
import AppText from "../components/AppText";
import Items from "../components/lists/Items";
import ListItemSeparator from "../components/lists/ItemSeparatorComponent";
import colors from "../config/colors";

function MyListingScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [refreshing, setRefreshing] = useState(false);
  const [myListings, setMyListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const { data: items, ok: response } = await listingApi.getUserListings(
      user.userId
    );
    if (!response) return;

    setMyListings(items);
  };

  return (
    <AppScreen style={styles.container}>
      <View style={styles.line}></View>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/jacket.jpg")} style={styles.image} />
      </View>
      <AppText style={styles.name}>{user.name}</AppText>
      <View style={{ height: 310 }}>
        <FlatList
          style={styles.list}
          data={myListings}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.listingId.toString()}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <Items
              imageUri={`http://192.168.1.13:9000/listingImage-${item.listingId}`}
              title={item.title}
              price={item.price}
              onPress={() =>
                navigation.navigate("ListingDetails", {
                  ...item,
                  imageUri: `http://192.168.1.13:9000/listingImage-${item.listingId}`,
                })
              }
            />
          )}
          contentContainerStyle={{
            marginBottom: 80,
          }}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchListings(user.userId);
            setRefreshing(false);
          }}
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
