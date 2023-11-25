import { View, Text } from "react-native";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants";

const useAuth = () => {
  const [loading, setLoading] = useState(false);

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
      console.log("Successfully logged in: ", user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { register, login };
};

export default useAuth;
