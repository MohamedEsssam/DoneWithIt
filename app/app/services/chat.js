import client from "./client";

const endpoint = "/chat";

const getChats = (userId) => {
  return client.get(`${endpoint}?userId=${userId}`);
};

const deleteChat = (chatId, userId) => {
  const data = {};
  data["chatId"] = chatId;
  data["userId"] = userId;

  return client.delete(`${endpoint}`, {}, { data });
};

export default {
  getChats,
  deleteChat,
};
