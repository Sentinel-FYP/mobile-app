import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { Button, Input, Text } from "@rneui/themed";
import { COLORS } from "../../constants";
import useAuth from "../../hooks/useAuth";
import useStorage from "../../hooks/useStorage";
import Loader from "../../components/Loader";
import { OneSignal } from "react-native-onesignal";
import ScreenHeader from "../../components/ScreenHeader";
import ScreenFooter from "../../components/ScreenFooter";

const ForgotPasswordScreen = ({ navigation }) => {
  // Variables
  const { getOTP, loading } = useAuth();
  const { setAuthToken, setLocalUser } = useStorage();
  const [email, setEmail] = useState({ value: null, errorMessage: null });

  // Event handlers
  const handleBackToLogin = () => {
    navigation.replace("Login");
  };

  const handleNextPress = async () => {
    setEmail({ ...email, errorMessage: null });

    if (!email.value) {
      setEmail({ ...email, errorMessage: "Please fill out all fields." });
      return;
    }

    try {
      const response = await getOTP(email.value);
      console.log(response);
      navigation.navigate("OTPVerification", { email: email.value });
    } catch (error) {
      console.error(
        "Error while getting OTP: ",
        JSON.stringify(error, null, 2)
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <ScreenHeader
        title={"Password Slip Up?"}
        description={"We will sort it out for you."}
      />
      <View style={styles.inputContainer}>
        <Input
          label={"Email"}
          labelStyle={styles.inputLabel}
          value={email.value}
          onChangeText={(value) => setEmail({ ...email, value: value })}
          errorMessage={email.errorMessage}
        />

        <View style={styles.btnContainer}>
          {loading ? (
            <Loader />
          ) : (
            <Button
              color="primary"
              title={"Next"}
              size="lg"
              containerStyle={{ width: "80%" }}
              onPress={handleNextPress}
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

export default ForgotPasswordScreen;
const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 20,
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
