import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import AppScreen from "../components/AppScreen";
import AppListInfo from "../components/lists/AppListInfo";
import ListItemSeparator from "../components/lists/ItemSeparatorComponent";
import ItemDeletionComponent from "../components/lists/ItemDeletionCompenent";
import ItemArchiveComponent from "../components/lists/ItemArchiveComponent";
import colors from "../config/colors";

const messages = [
  {
    image: require("../assets/logo-red.png"),
    title: "Mohamed Essam",
    subtitle: "hello Mohamed",
  },
  {
    image: require("../assets/logo-red.png"),
    title: "Ahmed hossam",
    subtitle: "hello Ahmed",
  },
];

function MessageScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  return (
    <AppScreen style={{ backgroundColor: colors.light }}>
      <View style={[styles.container, styles.margin]}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={() => (
            <ListItemSeparator
              style={{ backgroundColor: colors.medium, top: 1 }}
            />
          )}
          renderItem={({ item }) => (
            <AppListInfo
              image={item.image}
              title={item.title}
              subTitle={item.subtitle}
              onPress={() => console.log(item)}
              style={{ borderRadius: 35 }}
              touchable={true}
              renderRightActions={() => <ItemDeletionComponent />}
              renderLeftActions={() => <ItemArchiveComponent />}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => {}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    shadowColor: colors.light,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  margin: {
    // marginVertical: 20,
  },
});

export default MessageScreen;
