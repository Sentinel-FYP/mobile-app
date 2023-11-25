import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Button, Input, Text } from "@rneui/themed";
import { COLORS } from "../../constants";

const Register = ({ navigation }) => {
  const handleLoginPress = () => {
    navigation.navigate("Login");
  };
  return (
    <ScrollView
      style={{ width: "100%" }}
      contentContainerStyle={{
        flexGrow: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
      }}
    >
      <Text h2>Register</Text>
      <View
        style={{ width: "100%", alignItems: "center", paddingVertical: 40 }}
      >
        <Input label={"First Name"} labelStyle={styles.inputLabel} />
        <Input label={"Last Name"} labelStyle={styles.inputLabel} />
        <Input label={"Email"} labelStyle={styles.inputLabel} />
        <Input label={"Password"} labelStyle={styles.inputLabel} />
        <Input label={"Confirm Password"} labelStyle={styles.inputLabel} />

        <Button
          color="primary"
          title={"Register"}
          size="lg"
          containerStyle={{ width: 200, borderRadius: 5 }}
        />
      </View>
      <Text style={{ paddingVertical: 10 }}>
        Already have an account?{" "}
        <Text
          style={{ color: "blue", fontWeight: "bold" }}
          onPress={handleLoginPress}
        >
          Login
        </Text>
      </Text>
    </ScrollView>
  );
};

export default Register;
const styles = StyleSheet.create({
  inputLabel: {
    color: COLORS.black,
  },
});
