import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import {
  RTCView,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
} from "react-native-webrtc";
const webcamUrl = "http://your-laptop-ip:5000/video_feed";
const App = () => {
  const [stream, setStream] = useState(null);

  useEffect(() => {}, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {stream && (
        <RTCView style={{ flex: 1, width: "100%" }} streamURL={webcamUrl} />
      )}
      <Text>Video Streaming from Laptop</Text>
    </View>
  );
};

export default App;
