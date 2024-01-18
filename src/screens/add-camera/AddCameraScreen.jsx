import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AddCameraScreen = () => {
  const cameras = [
    {
      name: "Camera 6",
      ipAddress: "192.168.1.2",
      online: true,
    },
    {
      name: "Camera 7",
      ipAddress: "192.168.1.3",
      online: true,
    },
    {
      name: "Camera 8",
      ipAddress: "192.168.1.4",
      online: true,
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.cameraInfoContainer}>
          <View style={styles.cameraIconContainer}>
            <Icon size={32} color={COLORS.black} name="camera" />
            <View style={styles.cameraInfo}>
              <Text style={styles.cameraName}>{item.name}</Text>
              <Text>{item.ipAddress}</Text>
            </View>
          </View>

          <View style={styles.onlineIndicator}>
            <Text style={styles.onlineIndicatorText}>
              {item.online ? "Online" : "Offline"}
            </Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionIconContainer}>
            <Icon size={26} color={COLORS.danger} name="delete" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIconContainer}>
            <Icon size={26} color={COLORS.black} name="plus" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.discoveredCameras}>
        <Text style={styles.heading}>Discovered Cameras</Text>
        <FlatList data={cameras} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default AddCameraScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 500,
  },
  discoveredCameras: {
    paddingTop: 25,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
  },
  actionIconContainer: {
    width: 30,
    height: 30,
    backgroundColor: "#F7F8F9",
    borderRadius: 100,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "25%",
  },
  onlineIndicatorText: {
    fontWeight: "500",
  },
  onlineIndicator: {
    backgroundColor: "#ECFDF5",
    borderRadius: 20,
    paddingHorizontal: 5,
    justifyContent: "center",
    paddingVertical: 2,
    marginLeft: 30,
  },
  cameraName: {
    fontWeight: "700",
  },
  cameraInfo: {
    marginLeft: 10,
  },
  cameraIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cameraInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "75%",
    paddingRight: 30,
  },
  itemContainer: {
    width: "100%",
    padding: 10,
    height: 70,
    marginTop: 10,
    elevation: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    flexDirection: "row",
  },
});
