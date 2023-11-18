import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Button, Input, Text } from "@rneui/themed";
import { COLORS } from "../../constants";

const Register = () => {
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
      <Text h2>Login</Text>
      <View
        style={{ width: "100%", alignItems: "center", paddingVertical: 40 }}
      >
        <Input label={"Email"} labelStyle={styles.inputLabel} />
        <Input label={"Password"} labelStyle={styles.inputLabel} />
        <Button
          color="primary"
          title={"Login"}
          size="lg"
          containerStyle={{ width: 200, borderRadius: 5 }}
        />
      </View>
      <Text style={{ paddingVertical: 10 }}>
        Dont have an account?{" "}
        <Text
          style={{ color: "blue", fontWeight: "bold" }}
          onPress={handleRegisterNowPress}
        >
          Register Now
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
