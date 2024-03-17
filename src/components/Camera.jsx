import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { COLORS } from "../constants";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

const Camera = ({ item, onMorePress, selectedDevice, setCameraForOptions }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.cameraContainer}
      onPress={() => {
        navigation.navigate("LiveStream", {
          deviceID: selectedDevice.deviceID,
          cameraID: item._id,
          cameraName: item.cameraName,
        });
      }}
    >
      <View style={styles.cameraNameContainer}>
        <View
          style={[
            styles.dot,
            { backgroundColor: item.active ? COLORS.success : COLORS.error },
          ]}
        ></View>

        <Text
          style={[
            styles.cameraName,
            { color: item.active ? COLORS.success : COLORS.error },
          ]}
        >
          {item?.cameraName}
        </Text>
      </View>

      <Image
        style={styles.cameraThumbnail}
        source={{
          uri: `data:image/jpeg;base64,${item?.thumbnail}`,
        }}
      />
      <TouchableOpacity
        style={styles.moreBtn}
        onPress={(e) => {
          setCameraForOptions(item);
          onMorePress(e);
        }}
      >
        <Icon name="more-vert" size={24} color={COLORS.black} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default Camera;

const styles = StyleSheet.create({
  moreBtn: {
    width: 30,
    height: 30,
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 10,
    backgroundColor: "rgba(256,256,256,0.5)",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraThumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    borderRadius: 10,
  },
  cameraName: {
    fontWeight: "500",
  },
  dot: {
    width: 8,
    height: 8,

    borderRadius: 100,
    marginTop: 1.5,
  },
  cameraNameContainer: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.5)",
    left: 10,
    top: 10,
    zIndex: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  cameraContainer: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    aspectRatio: 9 / 6,
    borderRadius: 10,
  },
  addNewCameraBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 10,
    width: 60,
    height: 60,
    backgroundColor: COLORS.primaryColor,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  camerasContainer: {
    flex: 1,
    width: "100%",
    marginVertical: 10,
  },
  devicesContainer: {
    height: 70,
    width: "100%",
    marginVertical: 10,
  },
  guidingText: {
    fontWeight: "700",
    fontSize: 15,
  },
  welcomeText: {
    color: COLORS.gray,
    fontSize: 16,
  },
});
