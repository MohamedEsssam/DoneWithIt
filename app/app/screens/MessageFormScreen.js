import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, FlatList, KeyboardAvoidingView } from "react-native";
import openSocket from "socket.io-client";
import messageApi from "../services/message";

import AppMessageForm from "../components/forms/AppMessageForm";
import AppScreen from "../components/AppScreen";
import MessageItem from "../components/lists/MessageItem";

function MessageFormScreen({ route }) {
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
    messages.unshift(message);

    setItems(() => [...[], ...messages]);
  };

  return (
    <AppScreen style={styles.container}>
      <KeyboardAvoidingView
        style={{ height: "100%" }}
        behavior={Platform.OS === "ios" ? "position" : undefined}
        keyboardVerticalOffset={45}
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
                isMine={item.text === "haha !!"}
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
          <AppMessageForm />
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
    height: "84%",
  },
  input: {
    position: "relative",
  },
});

export default MessageFormScreen;
