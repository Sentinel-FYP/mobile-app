import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { GlobalStyles } from "../../global/GlobalStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../constants";
import useAuth from "../../hooks/useAuth";

const HomeScreen = ({ navigation }) => {
  const { logout } = useAuth();
  const [devices, setDevices] = useState([
    {
      name: "Sentinel Office",
      cameras: [
        { name: "Cam1" },
        { name: "Cam2" },
        { name: "Cam3" },
        { name: "Cam4" },
      ],
    },
  ]);

  const handleLogoutPress = async () => {
    try {
      await logout();
      navigation.navigate("AuthStack");
    } catch (error) {
      console.error("Error while logging out: ", error);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.deviceContainer}>
        <View style={styles.deviceNameConatiner}>
          <Text style={styles.deviceName}>{item.name}</Text>
          <View style={styles.camerasContainer}>
            <View style={styles.camerasWrapper}>
              {item.cameras.map((camera, index) => {
                return (
                  <TouchableOpacity key={camera.name} style={styles.camera}>
                    <Text>{camera.name}</Text>
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
              <TouchableOpacity>
                <Icon name="dots-vertical" color={COLORS.black} size={30} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
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
    alignItems: "center",
    justifyContent: "center",
  },
  camerasContainer: {
    width: "100%",
    flex: 1,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
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
