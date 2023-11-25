import { View, Text } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  async function setLocalUser(user) {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      throw error;
    }
  }

  async function getLocalUser() {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      return user;
    } catch (error) {
      throw error;
    }
  }

  async function setAuthToken(authToken) {
    try {
      await AsyncStorage.setItem("authToken", authToken);
    } catch (error) {
      throw error;
    }
  }

  async function getAuthToken() {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      return authToken;
    } catch (error) {
      throw error;
    }
  }
  return { getAuthToken, setAuthToken, getLocalUser, setLocalUser };
};

export default useStorage;
