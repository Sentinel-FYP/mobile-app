import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationScreen from "../screens/notifications/NotificationScreen";
import { COLORS } from "../constants";

const NotificationStack = createNativeStackNavigator();
const NotificationStackScreen = () => {
  return (
    <NotificationStack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.appBackground },
      }}
    >
      <NotificationStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
    </NotificationStack.Navigator>
  );
};

export default NotificationStackScreen;
