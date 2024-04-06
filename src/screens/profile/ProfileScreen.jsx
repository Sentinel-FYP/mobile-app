import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { GlobalStyles } from "../../global/GlobalStyles";
import useAuth from "../../hooks/useAuth";
import { COLORS } from "../../constants";
import { Input } from "@rneui/base";
import useStorage from "../../hooks/useStorage";
import useBackend from "../../hooks/useBackend";
import { OneSignal } from "react-native-onesignal";
import { Button } from "@rneui/themed";

const AddDeviceScreen = ({ navigation }) => {
  const [profileLoading, setProfileLoading] = useState(true);
  const [firstName, setFirstName] = useState({
    value: null,
    errorMessage: null,
  });
  const [lastName, setLastName] = useState({ value: null, errorMessage: null });
  const [email, setEmail] = useState({ value: null, errorMessage: null });
  const [userID, setUserID] = useState();

  const { getLocalUser, setLocalUser } = useStorage();
  const { loading, updateUserProfile } = useBackend();

  const { logout } = useAuth();

  useEffect(() => {
    async function getUser() {
      const user = await getLocalUser();
      setEmail({ value: user.email });
      setFirstName({ value: user.firstName });
      setLastName({ value: user.lastName });
      setUserID(user.userID);
      setProfileLoading(false);
    }
    getUser();
  }, []);

  const handleUpdateProfile = async () => {
    setFirstName({ ...firstName, errorMessage: null });
    setLastName({ ...lastName, errorMessage: null });
    setEmail({ ...email, errorMessage: null });

    if (!firstName.value) {
      setFirstName({
        ...firstName,
        errorMessage: "Please fill out all fields.",
      });
    }
    if (!lastName.value) {
      setLastName({ ...lastName, errorMessage: "Please fill out all fields." });
    }
    if (!email.value) {
      setEmail({ ...email, errorMessage: "Please fill out all fields." });
    }
    if (!(email.value && firstName.value && lastName.value)) {
      return;
    }

    try {
      const userData = await updateUserProfile({
        userID,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
      });
      console.log(userData);
      await setLocalUser(userData.user);
    } catch (error) {
      Alert.alert(
        "Error while updating profile",
        error.message || "An error occurred"
      );
      console.error("Error while updating profile:", error);
    }
  };

  const handleLogoutPress = async () => {
    try {
      await logout();
      OneSignal.logout();
      navigation.replace("AuthStack");
    } catch (error) {
      console.error("Error while logging out: ", error);
    }
  };

  return (
    <View style={GlobalStyles.container}>
      {profileLoading || loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} color={COLORS.primaryColor} />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            paddingHorizontal: 5,
          }}
        >
          <View>
            <Text style={styles.mainHeading}>Personal Details</Text>
            <Input
              label={"First Name"}
              labelStyle={styles.inputLabel}
              value={firstName.value}
              onChangeText={(value) =>
                setFirstName({ ...firstName, value: value })
              }
              errorMessage={firstName.errorMessage}
              style={styles.inputField}
              containerStyle={{ paddingHorizontal: 0 }}
            />
            <Input
              label={"Last Name"}
              labelStyle={styles.inputLabel}
              value={lastName.value}
              onChangeText={(value) =>
                setLastName({ ...lastName, value: value })
              }
              errorMessage={lastName.errorMessage}
              style={styles.inputField}
              containerStyle={{ paddingHorizontal: 0 }}
            />
            <Input
              label={"Email"}
              labelStyle={styles.inputLabel}
              value={email.value}
              onChangeText={(value) => setEmail({ ...email, value: value })}
              errorMessage={email.errorMessage}
              style={styles.inputField}
              containerStyle={{ paddingHorizontal: 0 }}
            />

            <Button
              onPress={handleUpdateProfile}
              containerStyle={styles.btnContainer}
              title={"Update"}
              radius={"xl"}
              size="lg"
            />
          </View>
          <Button
            onPress={handleLogoutPress}
            containerStyle={styles.btnContainer}
            title={"Logout"}
            titleStyle={{ color: COLORS.danger }}
            radius={"xl"}
            size="lg"
            type="outline"
          />
        </View>
      )}
    </View>
  );
};

export default AddDeviceScreen;

const styles = StyleSheet.create({
  mainHeading: {
    marginVertical: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.darkGray,
  },
  inputLabel: {
    color: COLORS.darkGray,
  },
  inputField: {
    marginTop: 10,
  },
  updateText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  btnContainer: {
    width: "70%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 20,
  },
  logoutContainer: {
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
  },
  logoutText: {
    color: COLORS.danger,
    fontSize: 18,
  },
});
