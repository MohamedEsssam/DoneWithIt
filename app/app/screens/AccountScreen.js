import React, { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import UserContext from "../auth/context";
import authStorage from "../auth/storage";

import AppScreen from "../components/AppScreen";
import AppListInfo from "../components/lists/AppListInfo";
import ListItemSeparator from "../components/lists/ItemSeparatorComponent";
import colors from "../config/colors";

const menuItems = [
  {
    title: "My Listings",
    icon: { name: "format-list-bulleted", backgroundColor: colors.primary },
    targeScreen: "MyListings",
  },
  {
    title: "My Messages",
    icon: { name: "email", backgroundColor: colors.secondary },
    targeScreen: "Messages",
  },
];

function AccountScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const handleLogout = () => {
    setUser(null);
    authStorage.removeToken();
  };
  return (
    <AppScreen style={{ backgroundColor: colors.light }}>
      <View style={styles.container}>
        <AppListInfo
          image={require("../assets/jacket.jpg")}
          title={user.name}
          subTitle={user.email}
          style={{ borderRadius: 25 }}
          disabled={true}
        />
      </View>
      <View style={[styles.container, styles.margin]}>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={() => (
            <ListItemSeparator
              style={{ backgroundColor: colors.medium, top: 1 }}
            />
          )}
          renderItem={({ item }) => (
            <AppListInfo
              title={item.title}
              iconType={item.icon.name}
              iconBackground={item.icon.backgroundColor}
              iconColor={colors.white}
              onPress={() => navigation.navigate(item.targeScreen)}
              style={{ borderRadius: 35 }}
              touchable={true}
            />
          )}
        />
      </View>
      <View style={[styles.container, { marginVertical: 40 }]}>
        <AppListInfo
          title="Logout"
          iconType="logout"
          iconBackground="#ffe66d"
          iconColor={colors.white}
          onPress={handleLogout}
          style={{ borderRadius: 35 }}
          touchable={true}
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
    marginVertical: 20,
  },
});

export default AccountScreen;
