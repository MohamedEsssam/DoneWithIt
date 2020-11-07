import * as SecureStore from "expo-secure-store";

const key = "user";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(authToken));
  } catch (error) {
    console.log("Error storing the user: ", error);
  }
};

const getToken = async () => {
  try {
    return JSON.parse(await SecureStore.getItemAsync(key));
  } catch (error) {
    console.log("Error getting the user: ", error);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the user: ", error);
  }
};

export default {
  storeToken,
  getToken,
  removeToken,
};
