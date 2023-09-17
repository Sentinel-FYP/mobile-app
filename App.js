import * as React from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  ActivityIndicator,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import axios from "axios";

export default function App() {
  const video = React.useRef(null);
  const serverUrl =
    "https://node-streaming-server-kwrdu5bz8-omar-sarfraz.vercel.app/videoplayer";
  const [status, setStatus] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Live Streaming Video From Server</Text>
      {loading && (
        <ActivityIndicator
          size={"large"}
          color={"black"}
          style={{ marginTop: 20 }}
        />
      )}
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: serverUrl,
          headers: { range: "bytes=0-" },
        }}
        // useNativeControls
        shouldPlay
        resizeMode={ResizeMode.COVER}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        onError={(error) => {
          console.log("Error in loading", error);
        }}
        onLoad={() => {
          setLoading(false);
        }}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    alignItems: "center",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: 200,
    marginTop: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000000",
  },
});
