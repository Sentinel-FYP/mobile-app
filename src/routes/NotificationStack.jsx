import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationScreen from "../screens/notifications/NotificationScreen";
import { COLORS } from "../constants";
import AnomalyClipScreen from "../screens/notifications/AnomalyClipScreen";

const NotificationStack = createNativeStackNavigator();
const NotificationStackScreen = () => {
  return (
    <NotificationStack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        contentStyle: { backgroundColor: COLORS.appBackground },
        headerTitleAlign: "center",
      }}
    >
      <NotificationStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <NotificationStack.Screen
        name="AnomalyClipScreen"
        component={AnomalyClipScreen}
      />
    </NotificationStack.Navigator>
  );
};

export default NotificationStackScreen;
