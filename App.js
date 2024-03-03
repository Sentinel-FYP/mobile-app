import React, { useEffect, useState } from "react";
import Router from "./src/routes/Router";
import { StatusBar } from "react-native";
import { COLORS, ONESIGNAL_APP_ID } from "./src/constants";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { RecoilRoot } from "recoil";
import { LogLevel, OneSignal } from "react-native-onesignal";
import { useNavigation } from "@react-navigation/native";
const theme = createTheme({
  lightColors: {
    primary: COLORS.primaryColor,
  },
  darkColors: {
    primary: COLORS.primaryColor,
  },
  components: {
    Button: {
      raised: true,
    },
  },
});
const App = () => {
  StatusBar.setBarStyle("light-content");
  StatusBar.setBackgroundColor(COLORS.black);
  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize(ONESIGNAL_APP_ID);

  // requestPermission will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  OneSignal.Notifications.requestPermission(true);

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
