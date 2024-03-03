import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { GlobalStyles } from "../../global/GlobalStyles";
import useBackend from "../../hooks/useBackend";
import Loader from "../../components/Loader";
import { COLORS } from "../../constants";
import { formatDateTime, getTime } from "../../util";

const NotificationScreen = ({ navigation }) => {
  const { loading, getNotificationsFromServer } = useBackend();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getLogs = async () => {
      try {
        const logs = await getNotificationsFromServer();
        console.log("Logs: ", logs.length);
        setNotifications(logs.reverse());
      } catch (error) {
        console.error(error);
      }
    };
    getLogs();
  }, []);
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate("AnomalyClipScreen", { anomaly: item });
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.notificationImage}
            source={{ uri: `data:image/png;base64,${item.thumbnail}` }}
          />
        </View>
        <View style={styles.notificationInfoContainer}>
          <View>
            <Text style={{ fontWeight: "500" }}>Anomaly Detected</Text>
            <Text
              style={styles.cameraNameText}
            >{`${item.fromDevice.deviceName} • ${item.fromDevice.cameras[0].cameraName}`}</Text>
          </View>

          <Text style={styles.timeText}>{`${getTime(item.occurredAt)}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={GlobalStyles.centeredContainer}>
      {notifications.length == 0 ? (
        <Loader />
      ) : (
        <View style={GlobalStyles.centeredContainer}>
          <Text style={styles.heading}>Notifications</Text>
          <FlatList
            data={notifications}
            renderItem={renderItem}
            style={styles.flatList}
          />
        </View>
      )}
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    width: "100%",
  },
  heading: {
    fontSize: 22,
    fontWeight: "500",
    padding: 20,
  },
  timeText: {},
  cameraNameText: {
    color: COLORS.gray,
  },

  notificationInfoContainer: {
    width: "70%",
    // backgroundColor: "red",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 10,
  },
  notificationImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imageContainer: {
    width: "30%",
    borderRadius: 10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    height: 100,
    backgroundColor: COLORS.white,
    padding: 10,
    marginTop: 10,
    elevation: 5,
    shadowColor: "#000",
    width: "95%",
    borderRadius: 20,
    shadowOffset: { width: 0, height: 2, shadowOpacity: 0.3, shadowRadius: 3 },
    alignSelf: "center",
  },
});
