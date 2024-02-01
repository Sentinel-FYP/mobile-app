import React, { useState, useEffect, useRef } from "react";
import { View, Image, Button } from "react-native";
import initializeSocket from "../../socket";
import { decode as atob, encode as btoa } from "base-64";
let socket = null;
const LiveStream = () => {
  const [currentFrame, setCurrentFrame] = useState(null);
  let buffer = useRef([]);
  let intervalId = null;
  let framecount = useRef(0);

  const initializeStreaming = async () => {
    try {
      socket = await initializeSocket();
      socket.on("stream:send", ({ frame }) => {
        let base64 = btoa(
          new Uint8Array(frame).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        base64 = atob(base64);
        buffer.current.push(base64);
        setCurrentFrame(base64);
        // console.log("frame", framecount.current++);
      });
      // intervalId = setInterval(() => {
      //   if (buffer.current.length > 24) {
      //     console.log("shifting buffer");
      //     let frame = buffer.current.shift();
      //     setCurrentFrame(frame);
      //   }
      // }, 1000 / 24);
    } catch (err) {
      console.log(err);
    }
  };

  const startStreaming = async () => {
    socket.emit("stream:start", {
      deviceId: "abc",
      cameraIP: "192.168.1.7:8554",
    });
  };

  useEffect(() => {
    initializeStreaming();
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <View>
      <Image
        source={{
          uri: `data:image/jpeg;base64,${currentFrame}`,
        }}
        style={{ width: "100%", height: 300 }}
      />
      <Button title="Start Streaming" onPress={startStreaming} />
    </View>
  );
};

export default LiveStream;
