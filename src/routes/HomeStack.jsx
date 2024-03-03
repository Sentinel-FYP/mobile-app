import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import AddCamera from "../screens/add-camera/AddCameraScreen";
import LiveStream from "../screens/live-stream/LiveStream";
import AddDeviceScreen from "../screens/add-device/AddDeviceScreen";
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { OneSignal } from "react-native-onesignal";

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  const navigation = useNavigation();
  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener("click", (event) => {
    navigation.navigate("NotificationStack", { Screen: "NotificationScreen" });
  });
  return (
    <HomeStack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerTitleAlign: "center",
        contentStyle: { backgroundColor: COLORS.appBackground },
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <HomeStack.Screen
        name="AddCamera"
        component={AddCamera}
        options={{ title: "Add Camera" }}
      />
      <HomeStack.Screen
        name="LiveStream"
        component={LiveStream}
        options={{ title: "Gate 4" }}
      />
      <HomeStack.Screen
        name="AddDeviceScreen"
        component={AddDeviceScreen}
        options={{ title: "Register Device" }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
