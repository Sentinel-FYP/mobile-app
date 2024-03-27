import {
  View,
  Text,
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
import { Tab } from "@rneui/themed";
import { Icon } from "@rneui/base";
import LogSectionList from "./LogSectionList";

const Notifications = () => {
  const page = useRef(1);
  const [notifications, setNotifications] = useState([]);

  const { loading, getNotifications } = useBackend();

  const getNextPage = async () => {
    page.current += 1;
    const newLogs = await getNotifications(page.current);
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
    const getNotificationsFromServer = async () => {
      try {
        let logs = await getNotifications();
        logs = logs
          .map((log) => {
            if (log.data.length == 0) return;
            return {
              ...log,
              title: log.title,
            };
          })
          .filter((item) => item !== undefined && item !== null && item !== "");
        setNotifications(logs);
      } catch (error) {
        console.error("Error while fetching notifications", error);
      }
    };
    getNotificationsFromServer();
  }, []);

  const NotificationItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.notificationContainer}>
        <View style={styles.typeOfNotificatoin}>
          <View style={styles.iconContainer}>
            <Icon name="notifications-none" size={30} color={COLORS.danger} />
          </View>
        </View>
        <View style={styles.notificationInfoContainer}>
          <View style={styles.titleAndTimeContainer}>
            <Text style={styles.title}>Anomaly Detected</Text>
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
    <View style={GlobalStyles.container}>
      {notifications.length == 0 && (
        <View style={styles.emptyStateTextContainer}>
          <Text style={styles.emptyStateText}>
            {`No notifications to show.`}
          </Text>
        </View>
      )}

      <LogSectionList
        sections={notifications}
        renderItem={NotificationItem}
        refreshing={loading}
        onRefresh={getNotifications}
        onEndReached={getNextPage}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  title: {
    fontWeight: "500",
  },
  titleAndTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "500",
  },
  emptyStateTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: COLORS.dangerLight,
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  typeOfNotificatoin: {
    height: "100%",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
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

  anomalyInfoContainer: {
    width: "70%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 5,
  },
  notificationInfoContainer: {
    width: "80%",
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
  anomalyContainer: {
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
  notificationContainer: {
    flex: 1,
    flexDirection: "row",
    height: 80,
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
