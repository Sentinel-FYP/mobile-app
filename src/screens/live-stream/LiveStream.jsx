import { View, Text, TouchableOpacity } from "react-native";
import { RTCView } from "react-native-webrtc";
import useWebRTC from "../../hooks/useWebRTC";
import { GlobalStyles } from "../../global/GlobalStyles";
import { Button } from "@rneui/themed";

const LiveStream = () => {
  const { remoteStream, startStreaming, stopStreaming } = useWebRTC();
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ padding: 10, fontSize: 20, fontWeight: 500 }}>
        React Native WebRTC Example
      </Text>
      <View style={GlobalStyles.container}>
        <RTCView
          objectFit="cover"
          streamURL={remoteStream ? remoteStream.toURL() : ""}
          style={{ width: "100%", height: "80%" }}
        />
        <Button
          title="Start Streaming"
          onPress={startStreaming}
          containerStyle={{ margin: 10 }}
          radius={"sm"}
        />
      </View>
    </View>
  );
};

export default LiveStream;
