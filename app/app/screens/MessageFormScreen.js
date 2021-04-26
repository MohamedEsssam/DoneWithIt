import React, { useContext, useEffect, useRef, useState } from "react";
import { useKeyboard } from "@react-native-community/hooks";
import { View, StyleSheet, FlatList, KeyboardAvoidingView } from "react-native";
import openSocket from "socket.io-client";
import messageApi from "../services/message";

import AppMessageForm from "../components/forms/AppMessageForm";
import AppScreen from "../components/AppScreen";
import MessageItem from "../components/lists/MessageItem";
import UserContext from "../auth/context";

function MessageFormScreen({ route }) {
  const chat = route.params;

  const { user } = useContext(UserContext);

  const keyboard = useKeyboard();
  const scrollView = useRef();

  const chatId = route.params.chatId;

  const [items, setItems] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  let messages = [];

  useEffect(() => {
    const socket = openSocket("http://192.168.1.13:9000");
    if (!fetched) fetchMessages();

    connectToMessage(socket);
  }, []);

  const connectToMessage = (socket) => {
    socket.on("message", (date) => {
      if (date.action === "create") createMessage(date.message);
    });
  };

  const fetchMessages = async () => {
    const { data: items, ok: response } = await messageApi.getMessages(chatId);
    if (!response) return;

    messages = items.slice(0);
    setItems(items);
    setFetched(true);
  };

  const createMessage = (message) => {
    messages.push(message);

    setItems(() => [...[], ...messages]);
  };

  const isKeyboardShow = () => {
    return keyboard.keyboardShown;
  };

  return (
    <AppScreen style={styles.container}>
      <KeyboardAvoidingView
        style={{ height: "100%" }}
        behavior={Platform.OS === "ios" ? "position" : undefined}
        keyboardVerticalOffset={45}
      >
        <View
          style={
            isKeyboardShow()
              ? { height: 320, top: "59%" }
              : { height: 555, bottom: "2%" }
          }
        >
          <View style={styles.message}>
            <FlatList
              ref={scrollView}
              onContentSizeChange={() =>
                scrollView.current.scrollToEnd({ animated: true })
              }
              data={items}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.messageId.toString()}
              renderItem={({ item }) => (
                <MessageItem
                  message={item.text}
                  isMine={item["senderId"] === user["userId"]}
                />
              )}
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fetchMessages();
                setRefreshing(false);
              }}
            />
          </View>
          <View style={styles.input}>
            <AppMessageForm chat={chat} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  message: {
    position: "relative",
    top: 10,
    zIndex: -1,
    height: "85%",
  },
  input: {
    position: "relative",
  },
});

export default MessageFormScreen;
