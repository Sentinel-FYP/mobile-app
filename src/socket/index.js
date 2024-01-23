import { io } from "socket.io-client";
import useStorage from "../hooks/useStorage";
import { SERVER_URL } from "../constants";

async function initializeSocket() {
  const { getAuthToken } = useStorage();
  const authToken = await getAuthToken();
  return io(`${SERVER_URL}?token=${authToken}`);
}

export default initializeSocket;
