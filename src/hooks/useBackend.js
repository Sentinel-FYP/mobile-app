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
      const url = `${API_BASE_URL}/anomalyLogs`;
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

  //GET 1 anomaly log from /api/anomalyLogs/:anomalyLogID . This result will contain an attribute videoUri. Which is the url for clip stored in S3 Bucket.
  async function getAnomalyLog(anomalyLogID) {
    setLoading(true);
    try {
      const url = `${API_BASE_URL}/anomalyLogs/${anomalyLogID}`;
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

  async function updateUserProfile(user) {
    setLoading(true);
    try {
      const url = `${API_BASE_URL}/users/${user.userID}`;
      const authToken = await getAuthToken();
      const response = await axios.put(url, user, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    } finally {
      setLoading(false);
    }
  }

  async function getCamerasFromEdge(deviceID) {
    setLoading(true);
    try {
      const url = `${API_BASE_URL}/cameras?deviceID=${deviceID}`;
      const authToken = await getAuthToken();
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function getCameraByID(cameraID) {
    setLoading(true);
    try {
      const url = `${API_BASE_URL}/cameras/${cameraID}`;
      const authToken = await getAuthToken();
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function updateCameraByID(cameraID, camera) {
    setLoading(true);
    try {
      const url = `${API_BASE_URL}/cameras/${cameraID}`;
      const authToken = await getAuthToken();
      const response = await axios.put(url, camera, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    getNotificationsFromServer,
    getEdgeDevices,
    registerEdgeDevice,
    getAnomalyLog,
    updateUserProfile,
    getCamerasFromEdge,
    getCameraByID,
    updateCameraByID,
  };
};

export default useBackend;
