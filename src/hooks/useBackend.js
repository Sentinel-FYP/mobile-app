import { View, Text } from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import useStorage from "./useStorage";
import axios from "axios";
import { API_BASE_URL } from "../constants";

const useBackend = () => {
  const { getAuthToken } = useStorage();
  const [loading, setLoading] = useState(false);

  async function getNotificationsFromServer() {
    setLoading(true);
    try {
      const deviceID = "6558f04547674cc283de271b";
      const url = `${API_BASE_URL}/anomalyLog/${deviceID}`;
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
      return response.data;
    } catch (error) {
      throw error.response.data;
    } finally {
      setLoading(false);
    }
  }

  async function registerEdgeDevice(device) {
    setLoading(true);
    try {
      const url = `${API_BASE_URL}/edgeDevices/register`;
      const authToken = await getAuthToken();
      const response = await axios.put(url, device, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    } finally {
      setLoading(false);
    }
  }
  return {
    loading,
    getNotificationsFromServer,
    getEdgeDevices,
    registerEdgeDevice,
  };
};

export default useBackend;
