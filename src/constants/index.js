export const COLORS = {
  // focusedIcon: '#F6DE84',
  primaryColor: "#477ED0",
  secondaryColor: "#F0F7F9",
  unfocusedIcon: "#6C6C6C",
  focusedLabel: "#FFFFFF",
  unfocusedLabel: "#6C6C6C",
  focusedBackground: "#202020",
  unfocusedBackground: "#ffffff",
  activeWeek: "#E6C650",
  appBackground: "#000000",
  white: "#ffffff",
  black: "#000000",
  danger: "#ff0e0e",
  success: "#388E3C",
  error: "#D32F2F",
  darkGray: "#5A5A5A",
  gray: "#808080",
  lightGray: "#D3D3D3",
  appBackground: "#FFFFFF",
};

export const ICE_SERVERS = [
  { urls: ["stun:stun.l.google.com:19302"] },
  {
    url: "turn:13.51.86.179:3478",
    username: "admin",
    credential: "admin",
  },
  {
    url: "turn:13.51.86.179:3478?transport=udp",
    username: "admin",
    credential: "admin",
  },
  {
    url: "turn:13.51.86.179:3478?transport=tcp",
    username: "admin",
    credential: "admin",
  },
];

//TODO: Move following to env
// export const SERVER_URL = "http://192.168.1.3:5500";
export const SERVER_URL = "http://13.51.86.179:5500";
export const API_BASE_URL = SERVER_URL + "/api";
export const ONESIGNAL_APP_ID = "32934bca-933b-4aa1-a60b-aa51f6e56075";
export const DEVICE_ID = "abc";
export const CAMERA_NAME = "test_camera";
