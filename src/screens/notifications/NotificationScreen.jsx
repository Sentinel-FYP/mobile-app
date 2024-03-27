import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState, useRef } from "react";
import { GlobalStyles } from "../../global/GlobalStyles";
import { COLORS } from "../../constants";
import { Tab } from "@rneui/themed";
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
        <View style={styles.tabsContainer}>
          <Tab
            value={tabIndex}
            onChange={setTabIndex}
            dense
            titleStyle={(active) => (active ? styles.activeTab : styles.tab)}
            indicatorStyle={styles.tabIndicator}
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
  tabIndicator: {
    backgroundColor: COLORS.primaryColor,
    height: 3,
  },
  tab: {
    color: COLORS.darkGray,
  },
  activeTab: {
    color: COLORS.primaryColor,
    fontWeight: "bold",
  },
  tabsContainer: {
    width: "100%",
  },
  heading: {
    fontSize: 22,
    fontWeight: "500",
    padding: 20,
  },
});
