import client from "./client";

const endpoint = "/message";

const getMessages = (chatId) => {
  return client.get(`${endpoint}?chatId=${chatId}`);
};

const sendMessage = (data) => {
  return client.post(`${endpoint}`, data);
};

export default {
  getMessages,
  sendMessage,
};
