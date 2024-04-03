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

  async function getOTP(email) {
    setLoading(true);
    console.log("getting otp for", email);
    try {
      const otpUrl = API_BASE_URL + `/otp?email=${email}`;
      const response = await axios.get(otpUrl);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function verifyOTP(email, otp) {
    setLoading(true);
    try {
      console.log("verifying otp for", email, otp);
      const otpUrl = API_BASE_URL + `/otp/verify`;
      const response = await axios.post(otpUrl, { email, otp });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword(userId, token, password) {
    setLoading(true);
    try {
      console.log("changing password", userId, token, password);
      const otpUrl = API_BASE_URL + `/otp/reset/password`;
      const response = await axios.post(otpUrl, { userId, token, password });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { register, login, logout, getOTP, verifyOTP, resetPassword, loading };
};

export default useAuth;
