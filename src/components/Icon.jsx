import { View, Text } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Icon = ({ name, size, style, ...props }) => {
  return (
    <MaterialCommunityIcons name={name} size={size} style={style} {...props} />
  );
};

export default Icon;
