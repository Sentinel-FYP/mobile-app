import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { Button, Input, Text } from "@rneui/themed";
import { COLORS } from "../../constants";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader";

const Register = ({ navigation }) => {
  // Variables
  const { register, loading } = useAuth();
  const [firstName, setFirstName] = useState({
    value: null,
    errorMessage: null,
  });
  const [lastName, setLastName] = useState({ value: null, errorMessage: null });
  const [email, setEmail] = useState({ value: null, errorMessage: null });
  const [password, setPassword] = useState({ value: null, errorMessage: null });
  const [confirmPassword, setConfirmPassword] = useState({
    value: null,
    errorMessage: null,
  });

  // Event handlers
  const handleLoginPress = () => {
    navigation.navigate("Login");
  };
  const handleRegisterPress = async () => {
    setFirstName({ ...firstName, errorMessage: null });
    setLastName({ ...lastName, errorMessage: null });
    setEmail({ ...email, errorMessage: null });
    setPassword({ ...password, errorMessage: null });
    setConfirmPassword({ ...confirmPassword, errorMessage: null });
    if (!firstName.value) {
      setFirstName({
        ...firstName,
        errorMessage: "Please fill out all fields.",
      });
    }
    if (!lastName.value) {
      setLastName({
        ...lastName,
        errorMessage: "Please fill out all fields.",
      });
    }
    if (!email.value) {
      setEmail({ ...email, errorMessage: "Please fill out all fields." });
    }
    if (!password.value) {
      setPassword({
        ...password,
        errorMessage: "Please fill out all fields.",
      });
    }
    if (!confirmPassword.value) {
      setConfirmPassword({
        ...confirmPassword,
        errorMessage: "Please fill out all fields.",
      });
    }

    if (
      !(
        firstName.value &&
        lastName.value &&
        email.value &&
        password.value &&
        confirmPassword.value
      )
    ) {
      return;
    }

    if (password.value != confirmPassword.value) {
      setPassword({
        ...password,
        errorMessage: "Password and confirm password do not match.",
      });
      setConfirmPassword({
        ...confirmPassword,
        errorMessage: "Password and confirm password do not match.",
      });
      return;
    }

    try {
      const userData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      };
      const user = await register(userData);
      navigation.navigate("Login");
    } catch (error) {
      console.error(
        `Error while registering user: Status: ${error.response?.status} Message: ${error.response?.data?.message}
        `
      );
      Alert.alert(error);
    }
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
        <Input
          label={"First Name"}
          labelStyle={styles.inputLabel}
          value={firstName.value}
          errorMessage={firstName.errorMessage}
          onChangeText={(value) => setFirstName({ ...firstName, value })}
        />
        <Input
          label={"Last Name"}
          labelStyle={styles.inputLabel}
          value={lastName.value}
          errorMessage={lastName.errorMessage}
          onChangeText={(value) => setLastName({ ...lastName, value })}
        />
        <Input
          label={"Email"}
          labelStyle={styles.inputLabel}
          value={email.value}
          errorMessage={email.errorMessage}
          onChangeText={(value) => setEmail({ ...email, value })}
        />
        <Input
          label={"Password"}
          labelStyle={styles.inputLabel}
          value={password.value}
          errorMessage={password.errorMessage}
          onChangeText={(value) => setPassword({ ...password, value })}
          secureTextEntry
        />
        <Input
          label={"Confirm Password"}
          labelStyle={styles.inputLabel}
          value={confirmPassword.value}
          errorMessage={confirmPassword.errorMessage}
          onChangeText={(value) =>
            setConfirmPassword({ ...confirmPassword, value })
          }
          secureTextEntry
        />
        <View style={{ marginTop: 20 }}>
          {loading ? (
            <Loader />
          ) : (
            <Button
              color="primary"
              title={"Register"}
              size="lg"
              containerStyle={{ width: 200, borderRadius: 5 }}
              onPress={handleRegisterPress}
            />
          )}
        </View>
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
