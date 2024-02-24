import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useLayoutEffect, useState } from "react";
import { GlobalStyles } from "../../global/GlobalStyles";
import useBackend from "../../hooks/useBackend";
import Loader from "../../components/Loader";
import { COLORS } from "../../constants";
import { formatDateTime } from "../../util";

const NotificationScreen = () => {
  const { loading, getNotificationsFromServer } = useBackend();
  const [notifications, setNotifications] = useState([]);

  useLayoutEffect(() => {
    const getLogs = async () => {
      try {
        const logs = await getNotificationsFromServer();
        console.log("logs[0] is", JSON.stringify(logs[0].fromDevice, null, 2));
        console.log("cameras", logs[0].fromDevice.cameras);
        setNotifications(logs.reverse());
      } catch (error) {
        console.error(error);
      }
    };
    getLogs();
  }, []);
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.notificationImage}
            source={{ uri: `data:image/png;base64,${item.thumbnail}` }}
          />
        </View>
        <View style={styles.notificationInfoContainer}>
          <View style={styles.timeAndDateContainer}>
            <Text
              style={styles.cameraNameText}
            >{`${item.fromDevice.deviceID} • ${item.fromDevice.cameras[0].cameraName}`}</Text>

            <Text style={styles.timeText}>{`${
              formatDateTime(item.occurredAt).date
            }`}</Text>
            <Text>{`${formatDateTime(item.occurredAt).time}`}</Text>
          </View>
        </View>
      </View>
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
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
  },
  timeText: {
    marginTop: 10,
  },
  cameraNameText: {
    fontSize: 16,
    fontWeight: "500",
  },
  timeAndDateContainer: {
    width: "100%",
    alignItems: "center",
  },
  notificationInfoContainer: {
    width: "70%",
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
    shadowOffset: { width: 0, height: 2, shadowOpacity: 0.3, shadowRadius: 3 },
  },
});
