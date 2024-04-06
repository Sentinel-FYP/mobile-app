//TODO: check that on add camera works by adding a camera and also add on camera delete once implemented on backend
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import { GlobalStyles } from "../../global/GlobalStyles";
import { COLORS, DEVICE_ID, DEVICE_CATEGORIES } from "../../constants";
import useBackend from "../../hooks/useBackend";
import initializeSocket from "../../socket";
import { useFocusEffect } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import DeviceCard from "../../components/DeviceCard";
import Loader from "../../components/Loader";
import Camera from "../../components/Camera";
import MoreOptions from "../../components/MoreOptions";

let socket = null;
const HomeScreen = ({ navigation }) => {
  // State variables
  const { loading: edgeLoading, getEdgeDevices } = useBackend();
  const [devices, setDevices] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [cameraForOptions, setCameraForOptions] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // Backend hooks
  const { loading: camerasLoading, getCamerasFromEdge } = useBackend();

  // Functions
  const showMenu = (event) => {
    setMenuPosition({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY });
    setMenuVisible(true);
  };

  const hideMenu = () => {
    setMenuVisible(false);
    setCameraForOptions(null);
  };

  const deleteCamera = async () => {
    try {
      Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete this camera?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              // Perform deletion action
              console.log("deleting camera", cameraForOptions._id);
              socket.emit("cameras:delete", {
                deviceID: selectedDevice.deviceID,
                cameraID: cameraForOptions._id,
              });
              hideMenu();
            },
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error while deleting camera: ", error);
    }
  };

  const reconnectCamera = async () => {
    try {
      socket.emit("cameras:reconnect", {
        deviceID: selectedDevice.deviceID,
        cameraID: cameraForOptions._id,
      });
      hideMenu();
    } catch (error) {
      console.error("Error while reconnecting camera: ", error);
    }
  };

  const getDevicesInfo = async () => {
    try {
      const devices = await getEdgeDevices();

      setDevices(devices);
    } catch (error) {
      console.error("Error while getting devices info: ", error);
    }
  };

  const getCameras = async (deviceID) => {
    try {
      const cameras = await getCamerasFromEdge(deviceID);
      setCameras(cameras);
    } catch (error) {
      if (error.response.status === 500) {
        Alert.alert(
          "Error",
          "Device is offline. Please check the device and try again."
        );
      }
      console.error("Error while getting cameras info: ", error);
    }
  };

  const onCameraAdded = (data) => {
    console.log("Camera added home: ", data);
    if (data.deviceID == selectedDevice.deviceID) {
      setCameras((prev) => {
        return [...prev, data.camera];
      });
    }
  };

  const startSocket = async () => {
    try {
      socket = await initializeSocket();
      socket.on("cameras:added", onCameraAdded);
      socket.emit("room:join", { deviceID: DEVICE_ID });
    } catch (error) {
      console.error("Error while connecting to socket: ", error);
    }
  };

  // Use effects
  useEffect(() => {
    getDevicesInfo();
    startSocket();

    return () => {
      if (socket) {
        console.log("socket off");
        socket.off("room:join");
      }
      setMenuVisible(false);
    };
  }, []);

  useEffect(() => {
    setSelectedDevice(devices[0]);
  }, [devices]);

  useEffect(() => {
    if (selectedDevice?.deviceID) {
      getCameras(selectedDevice?.deviceID);
    }
  }, [selectedDevice]);

  // useFocusEffect(
  //   useCallback(() => {
  //     getDevicesInfo();
  //   }, [])
  // );

  return (
    <View style={GlobalStyles.container}>
      <Text style={styles.welcomeText}>Hi Hammad!</Text>
      <Text style={styles.guidingText}>Here are your devices</Text>
      <View style={styles.devicesContainer}>
        <FlatList
          data={devices}
          renderItem={({ item, index }) => {
            return (
              <DeviceCard
                selected={item.deviceID == selectedDevice?.deviceID}
                iconName={DEVICE_CATEGORIES[item.category]}
                label={item.deviceName}
                iconType={"material-community"}
              />
            );
          }}
          contentContainerStyle={{
            justifyContent: "center",
          }}
          horizontal
          ListFooterComponent={() => {
            return (
              <DeviceCard
                iconName={"add-circle"}
                label={"Add"}
                iconSize={32}
                onPress={() => {
                  navigation.navigate("AddDeviceScreen");
                }}
              />
            );
          }}
        />
      </View>
      {camerasLoading ? (
        <View style={GlobalStyles.centeredContainer}>
          <Loader />
        </View>
      ) : (
        <View style={styles.camerasContainer}>
          <FlatList
            data={cameras}
            renderItem={({ item }) => (
              <Camera
                item={item}
                navigation={navigation}
                onMorePress={showMenu}
                selectedDevice={selectedDevice}
                setCameraForOptions={setCameraForOptions}
              />
            )}
            contentContainerStyle={{
              justifyContent: "center",
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {!edgeLoading && selectedDevice && (
        <TouchableOpacity
          style={styles.addNewCameraBtn}
          onPress={() => {
            navigation.navigate("AddCamera", {
              deviceID: selectedDevice?.deviceID,
              cameras: selectedDevice?.cameras,
            });
          }}
        >
          <Icon name="add" size={35} color={COLORS.white} />
        </TouchableOpacity>
      )}
      <MoreOptions
        menuVisible={menuVisible}
        menuPosition={menuPosition}
        hideMenu={hideMenu}
        deleteCamera={deleteCamera}
        reconnectCamera={reconnectCamera}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
