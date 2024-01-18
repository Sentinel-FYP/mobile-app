import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { SERVER_URL } from "../constants";
import useStorage from "./useStorage";

const useSocket = () => {
  let socket;
  async function initializeSocket() {
    const { getAuthToken } = useStorage();
    const authToken = await getAuthToken();
    socket = io(`${SERVER_URL}?token=${authToken}`);
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
    socket.on("connect_error", (err) => {
      console.log(err.message);
    });
    socket.on("reconnect_error", (err) => {
      console.log(err.message);
    });
    socket.on("reconnect_failed", () => {
      console.log("Reconnection Failed");
    });
    socket.on("reconnect", () => {
      console.log("Reconnected");
    });
    socket.on("reconnecting", () => {
      console.log("Reconnecting");
    });
    socket.on("error", (err) => {
      console.log(err.message);
    });
    socket.on("connect_timeout", (err) => {
      console.log(err.message);
    });
    socket.on("notification", (data) => {
      console.log(data);
    });
  }

  useEffect(() => {
    initializeSocket();
    return () => {
      socket.disconnect();
    };
  }, []);

  return { socket };
};

export default useSocket;
