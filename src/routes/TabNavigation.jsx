import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeStackScreen from "./HomeStack";
import NotificationStackScreen from "./NotificationStack";
import { darkColors, lightColors } from "@rneui/base";
import AddDeviceStackScreen from "./AddDeviceStack";
import { COLORS } from "../constants";

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          size += 8;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Notifications") {
            iconName = focused ? "bell" : "bell";
          } else if (route.name === "Add Device") {
            iconName = focused ? "plus-circle" : "plus-circle";
            size += 4;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primaryColor,
        tabBarInactiveTintColor: lightColors.grey3,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Add Device" component={AddDeviceStackScreen} />
      <Tab.Screen name="Notifications" component={NotificationStackScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
