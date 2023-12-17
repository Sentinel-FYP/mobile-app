import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import AddCamera from "../screens/add-camera/AddCameraScreen";

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="AddCamera"
        component={AddCamera}
        options={{ title: "Add Camera" }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
