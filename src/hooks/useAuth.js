import { View, Text } from "react-native";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import useStorage from "./useStorage";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { removeAuthToken, removeLocalUser } = useStorage();

  async function register(userData) {
    setLoading(true);
    try {
      const signUpUrl = API_BASE_URL + "/signup";
      const user = await axios.post(signUpUrl, userData);
      return user.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    setLoading(true);
    try {
      const loginUrl = API_BASE_URL + "/login";
      const loginData = { email: email, password: password };
      const user = await axios.post(loginUrl, loginData);
      return user.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await removeAuthToken();
      await removeLocalUser();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { register, login, logout, loading };
};

export default useAuth;
