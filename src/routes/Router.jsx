import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStackScreen from "./AuthStack";
import TabNavigation from "./TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { COLORS } from "../constants";

const RouterStack = createNativeStackNavigator();

const Router = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <NavigationContainer>
      <RouterStack.Navigator
        initialRouteName={isAuthenticated ? "TabNavigation" : "AuthStack"}
        screenOptions={{ headerShown: false }}
      >
        <RouterStack.Screen name="AuthStack" component={AuthStackScreen} />
        <RouterStack.Screen name="TabNavigation" component={TabNavigation} />
      </RouterStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.black,
  },
});
