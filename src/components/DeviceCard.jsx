import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../constants";
import { Icon } from "@rneui/themed";

const DeviceCard = ({
  iconName,
  selected,
  label,
  iconSize,
  onPress,
  iconType,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected ? styles.selectedContainer : styles.unselectedContainer,
        style,
      ]}
      onPress={onPress}
    >
      <Icon
        name={iconName}
        size={iconSize ?? 30}
        color={selected ? COLORS.white : COLORS.primaryColor}
        type={iconType}
      />
      <Text style={[selected ? styles.selectedText : styles.unselectedText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default DeviceCard;

export const styles = StyleSheet.create({
  container: {
    width: 60,
    aspectRatio: 1,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    borderRadius: 5,
    borderColor: COLORS.primaryColor,
    borderWidth: 1,
    backgroundColor: COLORS.secondaryColor,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },
  selectedContainer: {
    backgroundColor: COLORS.primaryColor,
  },
  unselectedContainer: {
    backgroundColor: COLORS.secondaryColor,
  },
  icon: {
    color: COLORS.primaryColor,
  },
  selectedText: {
    color: COLORS.white,
  },
  unselectedText: {
    color: COLORS.primaryColor,
  },
});
