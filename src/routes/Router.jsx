import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStackScreen from "./AuthStack";
import TabNavigation from "./TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../constants";
import Loader from "../components/Loader";
import useStorage from "../hooks/useStorage";

const RouterStack = createNativeStackNavigator();

const Router = () => {
  const { getAuthToken, getLocalUser } = useStorage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [intializing, setInitializing] = useState(true);

  useLayoutEffect(() => {
    const isLoggedIn = async () => {
      const authToken = await getAuthToken();
      if (authToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInitializing(false);
    };
    isLoggedIn();
  }, []);

  return intializing ? (
    <View style={styles.container}>
      <Loader />
    </View>
  ) : (
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
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
