import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

import { COLORS } from "../constants";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import OTPVerificationScreen from "../screens/auth/OTPVerificationScreen";
import ChangePasswordScreen from "../screens/auth/ChangePasswordScreen";

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        title: "Welcome to Sentinel",
        animation: "slide_from_right",
        contentStyle: { backgroundColor: COLORS.appBackground },
      }}
    >
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <AuthStack.Screen
        name="OTPVerification"
        component={OTPVerificationScreen}
      />
      <AuthStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
