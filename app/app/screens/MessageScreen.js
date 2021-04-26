import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import openSocket from "socket.io-client";
import UserContext from "../auth/context";
import chatApi from "../services/chat";

import AppScreen from "../components/AppScreen";
import AppListInfo from "../components/lists/AppListInfo";
import ListItemSeparator from "../components/lists/ItemSeparatorComponent";
import ItemDeletionComponent from "../components/lists/ItemDeletionCompenent";
import ItemArchiveComponent from "../components/lists/ItemArchiveComponent";
import colors from "../config/colors";

function MessageScreen({ navigation }) {
  let [items, setItems] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const { user } = useContext(UserContext);

  let chats = [];

  useEffect(() => {
    setDidMount(true);
    const socket = openSocket("http://192.168.1.13:9000");
    if (!fetched) fetchChats();
    connectToChats(socket);

    return () => setDidMount(false);
  }, []);

  const connectToChats = (socket) => {
    socket.on("chat", (date) => {
      if (date.action === "delete") deleteChat(date.chat);
    });
  };

  const fetchChats = async () => {
    const { data: items, ok: response } = await chatApi.getChats(user.userId);
    if (!response) return;

    chats = items.slice(0);
    setItems(items);
    setFetched(true);
  };

  const deleteChat = (chat) => {
    chats = chats.filter(function (obj) {
      return obj.chatId !== chat.chatId;
    });

    setItems(() => [...[], ...chats]);
  };

  const handleDelete = async (chatId) => {
    const { ok: response } = await chatApi.deleteChat(chatId, user.userId);
    if (!response) return console.log("error");
  };

  return (
    <AppScreen style={{ backgroundColor: colors.light }}>
      <View style={[styles.container, styles.margin]}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.chatId}
          ItemSeparatorComponent={() => (
            <ListItemSeparator
              style={{ backgroundColor: colors.medium, top: 1 }}
            />
          )}
          renderItem={({ item }) => (
            <AppListInfo
              image={item.image}
              title={item.callee}
              subTitle={item.lastMessage}
              onPress={() => {
                navigation.navigate("MessagesForm", item);
              }}
              style={{ borderRadius: 35 }}
              touchable={true}
              renderRightActions={() => (
                <ItemDeletionComponent
                  onPress={() => handleDelete(item.chatId)}
                />
              )}
              renderLeftActions={() => <ItemArchiveComponent />}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchChats();
            setRefreshing(false);
          }}
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
