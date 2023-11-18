import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { RTCView, mediaDevices } from "react-native-webrtc";
import { io } from "socket.io-client";

const App = () => {
  const [stream, setStream] = useState(null);

  useEffect(() => {
    // Connect to the signaling server
    const socket = io("wss://192.168.1.7:8765");
    socket.on("connect_error", (error) => {
      console.log("error connecting", error);
      socket.connect();
    });
    socket.on("connect", () => {
      console.log("socket id", socket.id);
    });
    // Handle incoming video stream
    socket.on("stream", (frameData) => {
      console.log("stream");
      const frameArray = new Uint8Array(frameData);
      const blob = new Blob([frameArray], { type: "image/jpeg" });

      mediaDevices.getUserMedia({ video: true }).then((localStream) => {
        const newStream = new MediaStream([localStream.getVideoTracks()[0]]);
        newStream.addTrack(MediaStream.createTrack(blob));

        setStream(newStream);
      });
    });

    // Clean up when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View>
      {stream ? (
        <RTCView
          streamURL={stream ? stream.toURL() : ""}
          style={{ width: 320, height: 240 }}
        />
      ) : (
        <Text>No video stream available</Text>
      )}
    </View>
  );
};

export default App;
