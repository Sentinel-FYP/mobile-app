import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { Button } from "@rneui/themed";
import { COLORS } from "../../constants";
import useAuth from "../../hooks/useAuth";
import useStorage from "../../hooks/useStorage";
import Loader from "../../components/Loader";
import ScreenHeader from "../../components/ScreenHeader";
import ScreenFooter from "../../components/ScreenFooter";
import OTPTextInput from "react-native-otp-textinput";

const OTPVerificationScreen = ({ navigation, route }) => {
  // Variables
  const { verifyOTP, getOTP, loading } = useAuth();
  const { email, registering } = route.params;
  const { setAuthToken, setLocalUser } = useStorage();
  const [otp, setOtp] = useState({ value: null, errorMessage: null });

  // Event handlers
  const handleResendPress = async () => {
    try {
      const response = await getOTP(email);
      console.log(response);
      Alert.alert("OTP sent successfully");
    } catch (error) {
      console.error(
        "Error while getting OTP: ",
        JSON.stringify(error, null, 2)
      );
    }
  };

  const handleNextPress = async () => {
    setOtp({ ...otp, errorMessage: null });

    if (!otp.value) {
      setOtp({ ...otp, errorMessage: "Please fill out all fields." });
      return;
    }

    try {
      const response = await verifyOTP(email, otp.value);
      console.log(response);
      const { token, userId } = response;
      if (registering) {
        navigation.navigate("Login");
      } else {
        navigation.navigate("ChangePassword", { token, userId });
      }
    } catch (error) {
      Alert.alert(
        "Error while verifying otp",
        error.message || "An error occurred"
      );
      console.error("Error while verifying otp: ", error.message || error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <ScreenHeader
        title={"Enter OTP"}
        description={"We sent a verification code to your email address."}
      />
      <View style={styles.inputContainer}>
        <OTPTextInput
          textInputStyle={{
            borderWidth: 4,
            borderRadius: 10,
            width: 40,
            height: 40,
          }}
          tintColor={COLORS.primaryColor}
          handleTextChange={(text) => setOtp({ ...otp, value: text })}
          keyboardType="numeric"
          inputCount={6}
          autoFocus
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
        description={"Didn't receive it?"}
        linkText={"Resend OTP"}
        linkPress={handleResendPress}
      />
    </ScrollView>
  );
};

export default OTPVerificationScreen;
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
