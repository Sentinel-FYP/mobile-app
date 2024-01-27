import React, { useState, useEffect, useRef } from "react";
import { View, Image } from "react-native";
import initializeSocket from "../../socket";
import { decode as atob, encode as btoa } from "base-64";

const LiveStream = () => {
  const [buffer, setBuffer] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(null);
  let intervalId = null;
  let framecount = useRef(0);
  const startStreaming = async () => {
    try {
      const socket = await initializeSocket();
      socket.on("stream", ({ frame }) => {
        console.log("frame", framecount.current++);
        setBuffer((prevBuffer) => [...prevBuffer, frame]);
      });
      //   intervalId = setInterval(() => {
      //     console.log(buffer.length);
      //     if (buffer.length > 0) {
      //       let frame = buffer.shift();
      //       let base64 = btoa(
      //         new Uint8Array(frame).reduce(
      //           (data, byte) => data + String.fromCharCode(byte),
      //           ""
      //         )
      //       );
      //       base64 = atob(frame);
      //       //   console.log("Frame", base64);
      //       // Update the state to trigger a re-render with the new image
      //       setCurrentFrame(base64);
      //     }
      //   }, 1000 / 30);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    startStreaming();
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <Image
      source={{
        uri: `data:image/jpeg;base64,${currentFrame}`,
      }}
      style={{ width: 300, height: 200 }}
    />
  );
};

export default LiveStream;
