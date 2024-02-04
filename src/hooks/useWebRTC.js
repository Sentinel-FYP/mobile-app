import { useState, useEffect } from "react";
import getSocket from "../socket";
import { RTCPeerConnection } from "react-native-webrtc";
import { ICE_SERVERS, DEVICE_ID, CAMERA_NAME } from "../constants";

let socket = null;
let peerConnection = null;
const useWebRTC = () => {
  const [remoteStream, setRemoteStream] = useState(null);

  const onRTCAnswer = async (answer) => {
    try {
      console.log("received answer", answer);
      peerConnection.setRemoteDescription(answer);
    } catch (error) {
      throw new Error("Error while setting remote description:", error);
    }
  };

  const initializeSocket = async () => {
    try {
      socket = await getSocket();
      socket.on("webrtc:answer", onRTCAnswer);
    } catch (error) {
      throw new Error("Error while initializing socket:", error);
    }
  };

  const intializeRTC = async () => {
    try {
      let config = {
        sdpSemantics: "unified-plan",
      };
      config.iceServers = ICE_SERVERS;
      peerConnection = new RTCPeerConnection(config);
      peerConnection.addEventListener("track", (evt) => {
        console.log("track received", evt);
        if (evt.track.kind === "video") {
          setRemoteStream(evt.streams[0]);
        }
      });
    } catch (error) {
      throw new Error("Error while initializing RTC:", error);
    }
  };

  const initializeStreaming = async () => {
    try {
      await initializeSocket();
      await intializeRTC();
    } catch (error) {
      console.error("Error while initializing streaming:", error);
    }
  };

  const waitForIceGatheringComplete = () =>
    new Promise((resolve) => {
      const checkState = () => {
        if (peerConnection.iceGatheringState === "complete") {
          console.log("iceGatheringState complete after waiting.");
          peerConnection.removeEventListener(
            "icegatheringstatechange",
            checkState
          );
          resolve();
        } else {
          console.log("iceGatheringState not complete yet. waiting...");
        }
      };

      if (peerConnection.iceGatheringState === "complete") {
        console.log("iceGatheringState complete");
        resolve();
      } else {
        peerConnection.addEventListener("icegatheringstatechange", checkState);
      }
    });

  const negotiateWithSocket = async () => {
    if (!peerConnection) throw new Error("Peer Connection is not defined");
    peerConnection.addTransceiver("video", { direction: "recvonly" });
    peerConnection.addTransceiver("audio", { direction: "recvonly" });

    try {
      const offer = await peerConnection.createOffer();
      console.log("offer created", offer);
      await peerConnection.setLocalDescription(offer);

      // wait for ICE gathering to complete
      await waitForIceGatheringComplete();

      socket.emit("webrtc:offer", {
        sdp: peerConnection.localDescription.sdp,
        type: peerConnection.localDescription.type,
        deviceId: DEVICE_ID,
        cameraName: CAMERA_NAME,
      });
    } catch (error) {
      throw new Error("Error while negotiating with socket:", error);
    }
  };

  const startStreaming = async () => {
    try {
      await negotiateWithSocket();
    } catch (error) {
      console.error("Error while starting streaming:", error);
    }
  };

  const stopStreaming = async () => {
    try {
      await peerConnection.close();
      await socket.off("webrtc:answer");
      peerConnection = null;
    } catch (error) {
      console.error("Error while stopping streaming:", error);
    }
  };

  useEffect(() => {
    initializeStreaming();
    return () => {
      stopStreaming();
    };
  }, []);

  return { remoteStream, startStreaming, stopStreaming };
};

export default useWebRTC;
