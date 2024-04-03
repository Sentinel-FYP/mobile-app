import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { Button, Input } from "@rneui/themed";
import { COLORS } from "../../constants";
import useAuth from "../../hooks/useAuth";
import useStorage from "../../hooks/useStorage";
import Loader from "../../components/Loader";
import ScreenHeader from "../../components/ScreenHeader";
import ScreenFooter from "../../components/ScreenFooter";
import OTPTextInput from "react-native-otp-textinput";

const ChangePasswordScreen = ({ navigation, route }) => {
  // Variables
  const { resetPassword, loading } = useAuth();
  const { userId, token } = route.params;
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [password, setPassword] = useState({ value: null, errorMessage: null });
  const [confirmPassword, setConfirmPassword] = useState({
    value: null,
    errorMessage: null,
  });

  // Event handlers
  const handleBackToLogin = () => {
    try {
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error while navigating to Login: ", error);
    }
  };

  const handleConfirmPress = async () => {
    setPassword({ ...password, errorMessage: null });
    setConfirmPassword({ ...confirmPassword, errorMessage: null });

    if (!password.value) {
      setPassword({ ...password, errorMessage: "Please fill out all fields." });
      return;
    }
    if (!confirmPassword.value) {
      setConfirmPassword({
        ...confirmPassword,
        errorMessage: "Please fill out all fields",
      });
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
      const response = await resetPassword(userId, token, password.value);
      console.log(response);
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert(
        "Error while changing password. Try again later.",
        error.message
      );
      console.error("Error while changing password.", error.message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <ScreenHeader
        title={"Reset Password"}
        description={"Enter your new password."}
      />
      <View style={styles.inputContainer}>
        <Input
          label={"Password"}
          labelStyle={styles.inputLabel}
          value={password.value}
          errorMessage={password.errorMessage}
          onChangeText={(value) => setPassword({ ...password, value })}
          secureTextEntry={!passwordVisibility}
          rightIcon={{
            name: !passwordVisibility ? "visibility-off" : "visibility",
            onPress: () => setPasswordVisibility(!passwordVisibility),
            underlayColor: COLORS.white,
          }}
        />
        <Input
          label={"Confirm Password"}
          labelStyle={styles.inputLabel}
          value={confirmPassword.value}
          errorMessage={confirmPassword.errorMessage}
          onChangeText={(value) =>
            setConfirmPassword({ ...confirmPassword, value })
          }
          secureTextEntry={!passwordVisibility}
        />

        <View style={styles.btnContainer}>
          {loading ? (
            <Loader />
          ) : (
            <Button
              color="primary"
              title={"Confirm"}
              size="lg"
              containerStyle={{ width: "80%" }}
              onPress={handleConfirmPress}
              radius={"xl"}
            />
          )}
        </View>
      </View>
      <ScreenFooter
        description={"Back to"}
        linkText={"Login"}
        linkPress={handleBackToLogin}
      />
    </ScrollView>
  );
};

export default ChangePasswordScreen;
const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 40,
    width: "100%",
    alignItems: "center",
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    padding: 10,
  },
  forgotPasswordText: {
    color: COLORS.primaryColor,
  },
  registerNowText: {
    color: COLORS.primaryColor,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    width: "100%",
    paddingVertical: 30,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  inputLabel: {
    color: COLORS.black,
  },
});
