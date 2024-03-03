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
import { useNavigation } from "@react-navigation/native";

// For testing purpose
let dummyCam = {
  name: "Gate 1",
  ipAddress: "192.168.1.1",
  online: true,
};

let socket = null;
const AddCameraScreen = ({ route }) => {
  const { deviceID, cameras: existingDeviceCameras } = route.params;
  const navigation = useNavigation();
  const [addCameraModalVisible, setAddCameraModalVisible] = useState(false);
  const [cameras, setCameras] = useState([dummyCam]);
  const [loading, setLoading] = useState(false);

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
      cameraIP: newIpAddress.value,
      username: newUsername.value,
      password: newPassword.value,
    });
    setLoading(true);
  };

  const onCameraAdded = (data) => {
    setLoading(false);
    console.log("Camera added: ", data);
    setAddCameraModalVisible(false);
    navigation.navigate("HomeScreen");
  };

  const onAddCameraModalClose = () => {
    setNewCameraName({ value: "", error: "" });
    setNewIpAddress({ value: "", error: "" });
    setAddCameraModalVisible(false);
  };

  const onAddManuallyPress = () => {
    setAddCameraModalVisible(true);
  };

  const onNewCameraDiscovered = (data) => {
    console.log("Camera discovered: ", data);
    const newCamIp = data.camera;
    setCameras((prev) => {
      const newCam = {
        name: `Camera ${prev.length + 1}`,
        ipAddress: newCamIp,
        online: true,
      };
      return [...prev, newCam];
    });
  };

  //TODO: implement this function once the events are clear on postman
  const onGetDiscoveredCameras = (data) => {
    console.log("Discovered Cameras: ", data);
    setCameras((prev) => {
      let newCameras = data.cameras.map((cam, i) => ({
        name: `Camera ${i + 1}`,
        ipAddress: cam,
        online: true,
      }));
      newCameras = newCameras.filter((cam) => {
        return cam.ipAddress != "\n";
      });
      return newCameras;
    });
  };

  const onDiscoverNetworkPress = () => {
    socket.emit("cameras:discover", { deviceID: deviceID });
  };

  async function startSocket() {
    try {
      socket = await getSocket();
      socket.on("cameras:discovered:new", onNewCameraDiscovered);
      socket.on("cameras:discovered", onGetDiscoveredCameras);
      socket.on("cameras:added", onCameraAdded);
      socket.emit("cameras:discovered:get", { deviceID: deviceID });
    } catch (error) {
      console.error("Error while connecting to socket: ", error);
    }
  }

  useEffect(() => {
    startSocket();
    return () => {
      if (socket) {
        console.log("socket off");
        socket.off("camera:discovered:new");
      }
    };
  }, []);

  const renderItem = ({ item, index }) => {
    const onDiscoveredCameraAddPress = () => {
      setCameraName(item.name);
      setIpAddress(item.ipAddress);
      setAddCameraModalVisible(true);
    };

    const onDiscoveredCameraDeletePress = () => {
      setCameras((prev) => {
        const newCameras = prev.filter((cam, i) => i !== index);
        return newCameras;
      });
    };

    return (
      <View style={styles.itemContainer}>
        <View style={styles.cameraInfoContainer}>
          <View style={styles.cameraIconContainer}>
            <View style={styles.cameraIconCircle}>
              <Icon size={32} color={COLORS.primaryColor} name="camera" />
            </View>
            <View style={styles.cameraInfo}>
              <Text style={styles.cameraName}>
                {item.name || item.cameraName}
              </Text>
              <Text>{item.ipAddress || item.cameraIP}</Text>
            </View>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          {/* Only registered cameras contain cameraName */}
          {item.cameraName ? (
            <TouchableOpacity
              style={[styles.actionIconContainer, styles.deleteIconContainer]}
              onPress={onDiscoveredCameraDeletePress}
            >
              <Icon size={24} color={COLORS.danger} name="delete" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.actionIconContainer}
              onPress={onDiscoveredCameraAddPress}
            >
              <Icon size={26} color={COLORS.black} name="plus" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.allCameras}>
        <View style={styles.camerasSection}>
          <Text style={styles.heading}>Registered Cameras</Text>
          <FlatList data={existingDeviceCameras} renderItem={renderItem} />
        </View>
        <View style={styles.camerasSection}>
          <View style={styles.discoverCamera}>
            <Text style={styles.heading}>Discovered Cameras</Text>
            <TouchableOpacity onPress={onDiscoverNetworkPress}>
              <Icon size={26} color={COLORS.darkGray} name="refresh" />
            </TouchableOpacity>
          </View>
          <FlatList data={cameras} renderItem={renderItem} />
          <AddManuallyButton
            title={"Add Manually"}
            onPress={onAddManuallyPress}
          />
        </View>
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
        loading={loading}
      />
    </View>
  );
};

export default AddCameraScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.darkGray,
  },
  discoverCamera: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 24,
  },
  camerasSection: {
    paddingTop: 25,
    paddingHorizontal: 10,
  },
  allCameras: {
    flex: 0.9,
  },
  container: {
    flex: 1,
  },
  actionIconContainer: {
    backgroundColor: "#F7F8F9",
    borderRadius: 100,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  deleteIconContainer: {
    backgroundColor: COLORS.danger + "30",
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
  cameraIconCircle: {
    padding: 8,
    backgroundColor: COLORS.primaryColor + "20",
    borderRadius: 30,
  },
  cameraInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    paddingRight: 30,
  },
  itemContainer: {
    width: "100%",
    padding: 10,
    height: 70,
    marginVertical: 5,
    elevation: 2,
    shadowColor: COLORS.darkGray,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

export const AddManuallyButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.cameraInfoContainer}>
        <View style={styles.cameraIconContainer}>
          <View style={styles.actionIconContainer}>
            <Icon size={26} color={COLORS.black} name="plus" />
          </View>
          <View style={styles.cameraInfo}>
            <Text style={styles.cameraName}>{title}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
