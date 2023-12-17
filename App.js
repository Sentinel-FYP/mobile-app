import React, { useEffect, useState } from "react";
import Router from "./src/routes/Router";
import { StatusBar } from "react-native";
import { COLORS } from "./src/constants";
import { ThemeProvider, createTheme } from "@rneui/themed";

const theme = createTheme({
  lightColors: {
    primary: "#02776B",
  },
  darkColors: {
    primary: "#02776B",
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
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
};

export default App;
