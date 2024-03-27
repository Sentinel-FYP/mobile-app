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
import Notifications from "../../components/Logs/Notifications";
import Anomalies from "../../components/Logs/Anomalies";

const NotificationScreen = ({ navigation }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [anomalies, setAnomalies] = useState([]);
  const [notifications, setNotifications] = useState([]);

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
        {tabIndex === 0 && (
          <Notifications
            notifications={notifications}
            setNotifications={setNotifications}
          />
        )}
        {tabIndex === 1 && (
          <Anomalies anomalies={anomalies} setAnomalies={setAnomalies} />
        )}
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
