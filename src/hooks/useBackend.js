import { View, Text } from "react-native";
import { useState } from "react";
import useStorage from "./useStorage";
import axios from "axios";
import { API_BASE_URL } from "../constants";

const useBackend = () => {
  const { getAuthToken } = useStorage();
  const [loading, setLoading] = useState(false);
  async function getNotificationsFromServer() {
    setLoading(true);
    try {
      const deviceId = "6558f04547674cc283de271b";
      const url = `${API_BASE_URL}/anomalyLog/${deviceId}`;
      const authToken = await getAuthToken();
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    } finally {
      setLoading(false);
    }
  }

  async function getEdgeDevices() {
    setLoading(true);
    try {
      const url = `${API_BASE_URL}/edgeDevices`;
      const authToken = await getAuthToken();
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      console.log(JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      throw error.response.data;
    } finally {
      setLoading(false);
    }
  }
  return { loading, getNotificationsFromServer, getEdgeDevices };
};

export default useBackend;
