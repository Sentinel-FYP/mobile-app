import { View, Text } from "react-native";
import { useState } from "react";
import useStorage from "./useStorage";
import axios from "axios";
import { API_BASE_URL } from "../constants";

const useBackend = () => {
  const { getAuthToken } = useStorage();
  const [loading, setLoading] = useState(false);
  async function getNotificationsFromServer() {
    try {
      const url = API_BASE_URL + "/anomalyLog";
      const fromDevice = "6558f04547674cc283de271b";
      const authToken = await getAuthToken();
    } catch (error) {
      throw error;
    }
  }
  return {};
};

export default useBackend;
