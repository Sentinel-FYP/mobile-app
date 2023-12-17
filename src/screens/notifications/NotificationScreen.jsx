import { View, Text, FlatList, Image } from "react-native";
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
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          height: 100,
          backgroundColor: COLORS.white,
          padding: 10,
          marginTop: 10,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
        }}
      >
        <View style={{ width: "30%", borderRadius: 10 }}>
          <Image
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            source={{ uri: `data:image/png;base64,${item.thumbnail}` }}
          />
        </View>
        <View style={{ width: "70%" }}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <Text
              style={{ fontSize: 16, fontWeight: 500 }}
            >{`${item.fromDevice.deviceID} • ${item.fromDevice.cameras[0].cameraName}`}</Text>

            <Text style={{ marginTop: 10 }}>{`${
              formatDateTime(item.occurredAt).date
            }`}</Text>
            <Text>{`${formatDateTime(item.occurredAt).time}`}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={GlobalStyles.container}>
      {notifications.length == 0 ? (
        <Loader />
      ) : (
        <View style={GlobalStyles.container}>
          <Text style={{ fontSize: 24, fontWeight: "bold", padding: 20 }}>
            Notifications
          </Text>
          <FlatList
            data={notifications}
            renderItem={renderItem}
            style={{ flex: 1, width: "100%" }}
          />
        </View>
      )}
    </View>
  );
};

export default NotificationScreen;
