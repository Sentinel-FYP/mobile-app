import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { lightColors } from "@rneui/base";

const Loader = ({ styles }) => {
  return (
    <ActivityIndicator
      style={styles}
      size="large"
      color={lightColors.primary}
    />
  );
};

export default Loader;
