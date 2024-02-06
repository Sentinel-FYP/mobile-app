import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { GlobalStyles } from "../../global/GlobalStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, DEVICE_ID } from "../../constants";
import useAuth from "../../hooks/useAuth";
import MoreOptions from "../../components/MoreOptions";
import useBackend from "../../hooks/useBackend";
import initializeSocket from "../../socket";

const HomeScreen = ({ navigation }) => {
  const { logout } = useAuth();
  const { getEdgeDevices } = useBackend();
  const [moreOptionsVisible, setMoreOptionsVisible] = useState(false);
  const [devices, setDevices] = useState([
    {
      name: "Sentinel Office",
      cameras: [
        { cameraName: "Cam1" },
        { cameraName: "Cam2" },
        { cameraName: "Cam3" },
        { cameraName: "Cam4" },
      ],
    },
  ]);

  const getDevicesInfo = async () => {
    try {
      const devices = await getEdgeDevices();
      setDevices(devices);
    } catch (error) {
      console.error("Error while getting devices info: ", error);
    }
  };

  const handleLogoutPress = async () => {
    try {
      await logout();
      navigation.navigate("AuthStack");
    } catch (error) {
      console.error("Error while logging out: ", error);
    }
  };

  const closeMoreOptions = () => {
    setMoreOptionsVisible(false);
  };
  const moreOptions = [
    {
      option: "Add New Camera",
      onPress: () => {
        console.log("add new camrea pressed");
        navigation.navigate("AddCamera", { deviceID: DEVICE_ID });
        closeMoreOptions();
      },
    },
    {
      option: "Show Device Info",
      onPress: () => {
        console.log("show deive info pressed");
        closeMoreOptions();
      },
    },
  ];

  const startSocket = async () => {
    try {
      const socket = await initializeSocket();
      socket.emit("join room", { deviceID: DEVICE_ID });
      return () => {
        console.log("socket off");
        socket.off("join room");
      };
    } catch (error) {
      console.error("Error while connecting to socket: ", error);
    }
  };

  //use effects
  useEffect(() => {
    getDevicesInfo();
    startSocket();
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <>
        <View style={styles.deviceContainer}>
          <View style={styles.deviceNameConatiner}>
            <Text style={styles.deviceName}>{item.deviceID}</Text>
            <View style={styles.camerasContainer}>
              <View style={styles.camerasWrapper}>
                {item.cameras.map((camera, index) => {
                  if (index > 3) return null;
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.camera}
                      onPress={() => {
                        navigation.navigate("LiveStream", {
                          deviceID: item.deviceID,
                          cameraName: camera.cameraName,
                        });
                      }}
                    >
                      <Text>{camera.cameraName}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={styles.deviceActionsContainer}>
                <TouchableOpacity>
                  <Icon name="delete" color={COLORS.black} size={30} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="group" color={COLORS.black} size={30} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="eye" color={COLORS.black} size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ overflow: "visible" }}
                  onPress={() => setMoreOptionsVisible(!moreOptionsVisible)}
                >
                  <Icon name="dots-vertical" color={COLORS.black} size={30} />

                  {moreOptionsVisible && (
                    <MoreOptions moreOptions={moreOptions} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={styles.logoutBtn} onPress={handleLogoutPress}>
        Logout
      </Text>
      <FlatList
        style={{ flex: 1, width: "100%" }}
        data={devices}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  logoutBtn: {
    alignSelf: "flex-end",
    margin: 20,
    fontWeight: "bold",
    fontSize: 16,
  },
  deviceActionsContainer: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  camera: {
    width: "50%",
    height: "50%",
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camerasWrapper: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  camerasContainer: {
    width: "100%",
    flex: 1,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderColor: COLORS.black,
  },
  deviceNameConatiner: {
    width: "100%",
    height: 300,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  deviceContainer: {
    width: "100%",
    paddingHorizontal: 30,
    marginTop: 20,
  },
});
