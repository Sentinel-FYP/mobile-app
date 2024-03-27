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

const NotificationScreen = ({ navigation }) => {
  const { loading, getAnomalies, getNotifications } = useBackend();
  const [notifications, setNotifications] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const page = useRef(1);

  const getNextPage = async () => {
    page.current += 1;
    const newLogs = await getAnomalies(page.current);
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

  const checkIfEmpty = () => {
    if (tabIndex === 0) {
      return notifications.length === 0;
    } else {
      return anomalies.length === 0;
    }
  };

  useEffect(() => {
    const getLogs = async () => {
      try {
        let logs = await getAnomalies();
        console.log("Logs: ", JSON.stringify(logs, null, 2));
        logs = logs
          .map((log) => {
            if (log.data.length == 0) return;
            return {
              ...log,
              title: log.title,
            };
          })
          .filter((item) => item !== undefined && item !== null && item !== "");
        setAnomalies(logs);
      } catch (error) {
        console.error("Error while fetching notifications", error);
      }
    };
    const getPushNotifications = async () => {
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
    getLogs();
    getPushNotifications();
  }, []);
  const renderAnomaly = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.anomalyContainer}
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
        <View style={styles.anomalyInfoContainer}>
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

  const renderNotification = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.notificationContainer}>
        <View style={styles.typeOfNotificatoin}>
          <View style={styles.iconContainer}>
            <Icon name="notifications-none" size={30} color={COLORS.danger} />
          </View>
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
        <Text style={styles.heading}>Alerts</Text>
        <View style={{ width: "100%", marginBottom: 10 }}>
          <Tab
            value={tabIndex}
            onChange={setTabIndex}
            dense
            titleStyle={(active) =>
              active
                ? { color: COLORS.primaryColor, fontWeight: "bold" }
                : { color: COLORS.darkGray }
            }
            indicatorStyle={{ backgroundColor: COLORS.primaryColor, height: 3 }}
          >
            <Tab.Item>Notifications</Tab.Item>
            <Tab.Item>Anomalies</Tab.Item>
          </Tab>
        </View>
        {checkIfEmpty() && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {`No ${tabIndex === 0 ? "notifications" : "anomalies"} to show.`}
            </Text>
          </View>
        )}
        <SectionList
          sections={anomalies}
          keyExtractor={(item, index) => index}
          renderItem={tabIndex === 0 ? renderNotification : renderAnomaly}
          renderSectionHeader={({ section: { title } }) => (
            <Text
              style={{
                paddingLeft: 15,
                paddingTop: 10,
                color: COLORS.darkGray,
              }}
            >
              {title}
            </Text>
          )}
          style={styles.flatList}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshing={loading}
          onRefresh={tabIndex == 0 ? getNotifications : getAnomalies}
          onEndReached={getNextPage}
          onEndReachedThreshold={0.1}
        />
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
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
