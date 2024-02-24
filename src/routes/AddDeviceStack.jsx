import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddDeviceScreen from "../screens/add-device/AddDeviceScreen";

const AddDeviceStack = createNativeStackNavigator();
const AddDeviceStackScreen = () => {
  return (
    <AddDeviceStack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.appBackground },
      }}
    >
      <AddDeviceStack.Screen
        name="AddDeviceScreen"
        component={AddDeviceScreen}
      />
    </AddDeviceStack.Navigator>
  );
};

export default AddDeviceStackScreen;
