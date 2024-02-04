import React, { useState, useEffect, useRef } from "react";
import { View, Image, Button, Text } from "react-native";
import getSocket from "../../socket";
import { decode as atob, encode as btoa } from "base-64";
import { RTCPeerConnection, RTCView } from "react-native-webrtc";
import { DEVICE_ID, CAMERA_NAME } from "../../constants";
import useWebRTC from "../../hooks/useWebRTC";

const LiveStream = () => {
  const { remoteStream, startStreaming, stopStreaming } = useWebRTC();
  return (
    <View>
      <Text>React Native WebRTC Example</Text>

      <RTCView
        objectFit="cover"
        streamURL={remoteStream ? remoteStream.toURL() : ""}
        style={{ width: "100%", minHeight: 300 }}
      />

      <Button title="Start Streaming" onPress={startStreaming} />
    </View>
  );
};

export default LiveStream;
