import { View, Text } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Video from "react-native-video";
import { GlobalStyles } from "../../global/GlobalStyles";
import useBackend from "../../hooks/useBackend";
import Loader from "../../components/Loader";
const AnomalyClipScreen = ({ route, navigation }) => {
  const { anomaly } = route.params;
  const { loading, getAnomalyLog } = useBackend();
  const [anomalyVideoUri, setAnomalyVideoUri] = useState(" ");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: anomaly.fromDevice.deviceName,
    });
  }, [navigation]);
  useEffect(() => {
    const fetchAnomalyDetails = async () => {
      try {
        const data = await getAnomalyLog(anomaly._id);
        console.log("Anomaly Log Data: ", data);
        setAnomalyVideoUri(data.videoUri);
      } catch (error) {
        console.error("Error while fetching anomaly log: ", error);
      }
    };
    fetchAnomalyDetails();
  }, []);

  return (
    <View style={GlobalStyles.centeredContainer}>
      <View style={GlobalStyles.centeredContainer}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading && (
            <Loader
              styles={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                zIndex: 10,
              }}
            />
          )}

          <Video
            source={{ uri: anomalyVideoUri }} // Can be a URL or a local file.
            ref={(ref) => {
              this.player = ref;
            }} // Store reference
            onBuffer={this.onBuffer} // Callback when remote video is buffering
            onError={this.videoError} // Callback when video cannot be loaded
            style={{
              width: "100%",
              // aspectRatio: 9 / 6,
              height: 450,
              // backgroundColor: "black",
            }}
            resizeMode="contain"
            posterResizeMode="contain"
            controls
            poster={`data:image/png;base64,${anomaly.thumbnail}`}
            repeat
          ></Video>
        </View>
      </View>
    </View>
  );
};

export default AnomalyClipScreen;
