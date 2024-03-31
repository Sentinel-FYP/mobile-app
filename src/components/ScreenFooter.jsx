import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../constants";

const ScreenFooter = ({ description, linkText, linkPress }) => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.descriptionText}>
        {description + " "}
        <Text style={styles.linkText} onPress={linkPress}>
          {linkText}
        </Text>
      </Text>
    </View>
  );
};

export default ScreenFooter;

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingVertical: 10,
  },
  descriptionText: {
    paddingVertical: 10,
    fontSize: 16,
  },
  linkText: {
    color: COLORS.primaryColor,
    fontWeight: "bold",
  },
});
