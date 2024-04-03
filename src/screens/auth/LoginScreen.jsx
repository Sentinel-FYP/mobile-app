import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Button, Input, Text } from "@rneui/themed";
import { COLORS } from "../../constants";
import useAuth from "../../hooks/useAuth";
import useStorage from "../../hooks/useStorage";
import Loader from "../../components/Loader";
import { OneSignal } from "react-native-onesignal";
import ScreenHeader from "../../components/ScreenHeader";
import ScreenFooter from "../../components/ScreenFooter";

const Login = ({ navigation }) => {
  // Variables
  const { login, loading } = useAuth();
  const { setAuthToken, setLocalUser } = useStorage();
  const [email, setEmail] = useState({ value: null, errorMessage: null });
  const [password, setPassword] = useState({ value: null, errorMessage: null });
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  // Event handlers
  const handleRegisterNowPress = () => {
    navigation.navigate("Register");
  };

  const handleLoginPress = async () => {
    setEmail({ ...email, errorMessage: null });
    setPassword({ ...password, errorMessage: null });
    if (!email.value) {
      setEmail({ ...email, errorMessage: "Please fill out all fields." });
    }
    if (!password.value) {
      setPassword({ ...password, errorMessage: "Please fill out all fields." });
    }
    if (!(email.value && password.value)) {
      return;
    }

    try {
      const userData = await login(email.value, password.value);
      console.log(userData);
      OneSignal.login(userData.user.userID);
      await setAuthToken(userData.token);
      await setLocalUser(userData.user);
      navigation.navigate("TabNavigation");
    } catch (error) {
      Alert.alert(
        "Error while logging in",
        error.message || "An error occurred"
      );
      console.error("Error while logging in: ", error.message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <ScreenHeader
        title={"Hi, Welcome Back"}
        description={"Login to your account"}
      />
      <View style={styles.inputContainer}>
        <Input
          label={"Email"}
          labelStyle={styles.inputLabel}
          value={email.value}
          onChangeText={(value) => setEmail({ ...email, value: value })}
          errorMessage={email.errorMessage}
        />
        <Input
          label={"Password"}
          labelStyle={styles.inputLabel}
          value={password.value}
          onChangeText={(value) => setPassword({ ...password, value: value })}
          errorMessage={password.errorMessage}
          secureTextEntry={!passwordVisibility}
          rightIcon={{
            name: !passwordVisibility ? "visibility-off" : "visibility",
            onPress: () => setPasswordVisibility(!passwordVisibility),
            underlayColor: COLORS.white,
          }}
        />
        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <View style={styles.btnContainer}>
          {loading ? (
            <Loader />
          ) : (
            <Button
              color="primary"
              title={"Login"}
              size="lg"
              containerStyle={{ width: "80%" }}
              onPress={handleLoginPress}
              radius={"xl"}
            />
          )}
        </View>
      </View>
      <ScreenFooter
        description={"Don't have an account?"}
        linkText={"Register Now"}
        linkPress={handleRegisterNowPress}
      />
    </ScrollView>
  );
};

export default Login;
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
