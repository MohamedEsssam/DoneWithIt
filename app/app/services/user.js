import { AsyncStorage } from "react-native";
import client from "./client";

const endpoint = "/user";

const login = (user) => {
  return client.post(`${endpoint}/login`, user);
};

const register = (user) => {
  return client.post(`${endpoint}/register`, user);
};

export const setUser = async (user) => {
  await AsyncStorage.setItem("user", JSON.stringify(user));
};

export const removeCurrentUser = async (user) => {
  await AsyncStorage.removeItem("user");
};

export const currentUser = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    return JSON.parse(user);
  } catch (error) {
    console.log(error);
  }
};

export default {
  login,
  register,
};
