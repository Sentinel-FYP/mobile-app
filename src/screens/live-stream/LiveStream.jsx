import React, { useState, useEffect, useRef } from "react";
import { View, Image, Button, Text } from "react-native";
import initializeSocket from "../../socket";
import { decode as atob, encode as btoa } from "base-64";
import { RTCPeerConnection, RTCView } from "react-native-webrtc";
import { DEVICE_ID, CAMERA_NAME } from "../../constants";
let socket = null;
let pc = null;
const LiveStream = () => {
  const [remoteStream, setRemoteStream] = useState(null);

  const initializeStreaming = async () => {
    try {
      socket = await initializeSocket();
      socket.on("webrtc:answer", (answer) => {
        console.log("received answer", answer);
        pc.setRemoteDescription(answer);
      });

      var config = {
        sdpSemantics: "unified-plan",
      };
      config.iceServers = [
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
      pc = new RTCPeerConnection(config);
      pc.addEventListener("track", (evt) => {
        console.log("track received", evt);
        if (evt.track.kind === "video") {
          setRemoteStream(evt.streams[0]);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const negotiateWithSocket = async () => {
    if (!pc) throw new Error("pc is not defined");
    pc.addTransceiver("video", { direction: "recvonly" });
    pc.addTransceiver("audio", { direction: "recvonly" });

    try {
      const offer = await pc.createOffer();
      console.log("offer created", offer);
      await pc.setLocalDescription(offer);

      // wait for ICE gathering to complete
      await new Promise((resolve) => {
        if (pc.iceGatheringState === "complete") {
          console.log("iceGatheringState complete");
          resolve();
        } else {
          console.log("iceGatheringState not complete yet. waiting...");
          const checkState = () => {
            if (pc.iceGatheringState === "complete") {
              console.log("iceGatheringState complete after waiting.");
              pc.removeEventListener("icegatheringstatechange", checkState);
              resolve();
            }
          };
          pc.addEventListener("icegatheringstatechange", checkState);
        }
      });

      socket.emit("webrtc:offer", {
        sdp: pc.localDescription.sdp,
        type: pc.localDescription.type,
        deviceId: DEVICE_ID,
        cameraName: CAMERA_NAME,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const startStreaming = async () => {
    negotiateWithSocket();
  };

  const stopStreaming = async () => {
    pc.close();
    pc = null;
  };

  useEffect(() => {
    initializeStreaming();
    return () => {
      stopStreaming();
    };
  }, []);

  return (
    <View>
      <Text>React Native WebRTC Example</Text>

      <RTCView
        objectFit="cover"
        streamURL={remoteStream ? remoteStream.toURL() : ""}
        style={{ width: "100%", minHeight: 300 }}
      />

      <Button title="Start Streaming" onPress={startStreaming} />
      <Button title="Stop Streaming" onPress={stopStreaming} />
    </View>
  );
};

export default LiveStream;
