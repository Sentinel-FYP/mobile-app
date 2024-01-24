import { io } from "socket.io-client";
import useStorage from "../hooks/useStorage";
import { SERVER_URL } from "../constants";

let socket = null;
async function initializeSocket() {
  if (!socket) {
    const { getAuthToken } = useStorage();
    const authToken = await getAuthToken();
    socket = io(`${SERVER_URL}?token=${authToken}`);
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
    socket.on("error", (error) => {
      console.log(error);
    });
  }
  return socket;
}

export default initializeSocket;
