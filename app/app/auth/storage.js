import * as SecureStore from "expo-secure-store";

const key = "user";

const storeUser = async (user) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(user));
  } catch (error) {
    console.log("Error storing the user: ", error);
  }
};

const getUser = async () => {
  try {
    return JSON.parse(await SecureStore.getItemAsync(key));
  } catch (error) {
    console.log("Error getting the user: ", error);
  }
};

const removeUser = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the user: ", error);
  }
};

export default {
  storeUser,
  getUser,
  removeUser,
};
