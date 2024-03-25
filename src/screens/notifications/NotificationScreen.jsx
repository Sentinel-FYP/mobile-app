import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SectionList,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { GlobalStyles } from "../../global/GlobalStyles";
import useBackend from "../../hooks/useBackend";
import Loader from "../../components/Loader";
import { COLORS } from "../../constants";
import { formatDateTime, getTime } from "../../util";

const NotificationScreen = ({ navigation }) => {
  const { loading, getNotificationsFromServer } = useBackend();
  const [notifications, setNotifications] = useState([]);
  const page = useRef(1);

  const getNextPage = async () => {
    page.current += 1;
    const newLogs = await getNotificationsFromServer(page.current);
    let existingLogs = notifications;
    newLogs.forEach((newLog) => {
      if (newLog.data.length === 0) return;
      const existingCategoryIndex = existingLogs.findIndex(
        (item) => item.title === newLog.title
      );
      if (existingCategoryIndex !== -1) {
        existingData[existingCategoryIndex].data.push(...newLog.data);
      } else {
        existingData.push(newLog);
      }
    });
  };

  useEffect(() => {
    const getLogs = async () => {
      try {
        let logs = await getNotificationsFromServer();
        console.log("Logs: ", JSON.stringify(logs, null, 2));
        // setNotifications(logs.reverse());
        logs = logs
          .map((log) => {
            if (log.data.length == 0) return;
            return {
              ...log,
              title: log.title.toUpperCase(),
            };
          })
          .filter((item) => item !== undefined && item !== null && item !== "");
        setNotifications(logs);
      } catch (error) {
        console.error("Error while fetching notifications", error);
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "500" }}>Anomaly Detected</Text>
            <Text style={styles.timeText}>{`${getTime(item.occurredAt)}`}</Text>
          </View>
          <Text
            style={styles.cameraNameText}
          >{`${item.fromDevice.deviceName} • ${item.fromCamera.cameraName}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={GlobalStyles.centeredContainer}>
      <View style={GlobalStyles.centeredContainer}>
        <Text style={styles.heading}>Notifications</Text>
        {notifications.length === 0 && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              No anomalies to show.
            </Text>
          </View>
        )}
        <SectionList
          sections={notifications}
          keyExtractor={(item, index) => index}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ paddingLeft: 15, color: COLORS.darkGray }}>
              {title}
            </Text>
          )}
          style={styles.flatList}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshing={loading}
          onRefresh={getNotificationsFromServer}
          onEndReached={getNextPage}
          onEndReachedThreshold={0.1}
        />
      </View>
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
  timeText: {
    color: COLORS.darkGray,
  },
  cameraNameText: {
    color: COLORS.darkGray,
  },

  notificationInfoContainer: {
    width: "70%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 5,
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
