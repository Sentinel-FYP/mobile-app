import React, { useEffect, useState } from "react";
import Router from "./src/routes/Router";
import { StatusBar } from "react-native";
import { COLORS } from "./src/constants";

const App = () => {
  StatusBar.setBarStyle("light-content");
  StatusBar.setBackgroundColor(COLORS.black);
  return <Router />;
};

export default App;
