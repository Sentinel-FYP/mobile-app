import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, DEVICE_ID } from "../../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import getSocket from "../../socket";
import { Button } from "@rneui/themed";
import AddCamera from "../../components/AddCamera";

let socket = null;
const AddCameraScreen = ({ route }) => {
  const { deviceID } = route.params;
  const [addCameraModalVisible, setAddCameraModalVisible] = useState(false);
  const [cameras, setCameras] = useState([
    {
      name: "Camera 6",
      ipAddress: "192.168.1.2",
      online: true,
    },
  ]);

  const [newCameraName, setNewCameraName] = useState({
    value: "",
    error: "",
  });
  const [newIpAddress, setNewIpAddress] = useState({ value: "", error: "" });
  const [newUsername, setNewUsername] = useState({ value: "", error: "" });
  const [newPassword, setNewPassword] = useState({ value: "", error: "" });

  const setCameraName = (value) => {
    setNewCameraName({ ...newCameraName, value });
  };
  const setIpAddress = (value) => {
    setNewIpAddress({ ...newIpAddress, value });
  };
  const setUsername = (value) => {
    setNewUsername({ ...newUsername, value });
  };
  const setPassword = (value) => {
    setNewPassword({ ...newPassword, value });
  };

  const inputValidation = () => {
    let isValid = true;
    if (newCameraName.value === "") {
      setNewCameraName({ ...newCameraName, error: "Camera name is required" });
      isValid = false;
    }
    if (newIpAddress.value === "") {
      setNewIpAddress({ ...newIpAddress, error: "IP Address is required" });
      isValid = false;
    }
    return isValid;
  };

  const onAddCameraPress = () => {
    if (!inputValidation()) {
      return;
    }

    console.log("Adding camera: ", newCameraName.value, newIpAddress.value);

    socket.emit("cameras:add", {
      deviceID: deviceID,
      cameraName: newCameraName.value,
      ipAddress: newIpAddress.value,
      username: newUsername.value,
      password: newPassword.value,
    });
  };

  const onAddCameraModalClose = () => {
    setNewCameraName({ value: "", error: "" });
    setNewIpAddress({ value: "", error: "" });
    setAddCameraModalVisible(false);
  };

  const onAddManuallyPress = () => {
    setAddCameraModalVisible(true);
  };

  const onCameraDiscovered = (data) => {
    const newCamIp = data.camera;
    const newCam = {
      name: `Camera ${discoveredCameras.length + 1}`,
      ipAddress: newCamIp,
      online: true,
    };
    setCameras([...discoveredCameras, data.camera]);
  };

  async function startSocket() {
    try {
      socket = await getSocket();
      socket.on("cameras:discovered:new", onCameraDiscovered);
      socket.emit("cameras:discover", { deviceID: deviceID });
    } catch (error) {
      console.error("Error while connecting to socket: ", error);
    }
  }

  useEffect(() => {
    startSocket();
    return () => {
      if (socket) {
        console.log("socket off");
        socket.off("cameras:discovered");
      }
    };
  }, []);

  const renderItem = ({ item, index }) => {
    const onDiscoveredCameraAddPress = () => {
      setCameraName(item.name);
      setIpAddress(item.ipAddress);
      setAddCameraModalVisible(true);
    };

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
          <TouchableOpacity
            style={styles.actionIconContainer}
            onPress={onDiscoveredCameraAddPress}
          >
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
      <View
        style={{
          flex: 0.2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          title={"Add Manually"}
          containerStyle={{ width: "80%" }}
          radius={"md"}
          onPress={onAddManuallyPress}
        />
      </View>
      <AddCamera
        visible={addCameraModalVisible}
        cameraName={newCameraName}
        ipAddress={newIpAddress}
        username={newUsername}
        password={newPassword}
        onClose={onAddCameraModalClose}
        onCameraNameChange={setCameraName}
        onIpAddressChange={setIpAddress}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onAddCameraPress={onAddCameraPress}
      />
    </View>
  );
};

export default AddCameraScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "500",
  },
  discoveredCameras: {
    paddingTop: 25,
    paddingHorizontal: 10,
    flex: 0.9,
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
