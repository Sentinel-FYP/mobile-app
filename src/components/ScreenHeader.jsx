import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../global/GlobalStyles";
import { COLORS } from "../constants";

const ScreenHeader = ({ title, description }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/img/logo.png")} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  container: {
    width: "100%",
    paddingHorizontal: 10,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
  },
});
