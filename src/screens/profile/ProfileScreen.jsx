import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { GlobalStyles } from "../../global/GlobalStyles";
import useAuth from "../../hooks/useAuth";
import { COLORS } from "../../constants";
import { Input } from "@rneui/base";
import useStorage from "../../hooks/useStorage";
import useBackend from "../../hooks/useBackend";

const AddDeviceScreen = ({ navigation }) => {
  const [profileLoading, setProfileLoading] = useState(true);
  const [firstName, setFirstName] = useState({ value: null, errorMessage: null });
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
      setFirstName({ ...firstName, errorMessage: "Please fill out all fields." });
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
      Alert.alert("Error while updating profile", error?.message);
      console.error("Error while updating profile:", error);
    }
  };

  const handleLogoutPress = async () => {
    try {
      await logout();
      navigation.navigate("AuthStack");
    } catch (error) {
      console.error("Error while logging out: ", error);
    }
  };

  return (
    <View style={GlobalStyles.container}>
      {profileLoading || loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size={"large"} color={COLORS.primaryColor} />
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <Text style={styles.mainHeading}>Personal Details</Text>
            <Input
              label={"First Name"}
              labelStyle={styles.inputLabel}
              value={firstName.value}
              onChangeText={(value) => setFirstName({ ...firstName, value: value })}
              errorMessage={firstName.errorMessage}
              style={styles.inputField}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              containerStyle={{ paddingHorizontal: 0 }}
            />
            <Input
              label={"Last Name"}
              labelStyle={styles.inputLabel}
              value={lastName.value}
              onChangeText={(value) => setLastName({ ...lastName, value: value })}
              errorMessage={lastName.errorMessage}
              style={styles.inputField}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              containerStyle={{ paddingHorizontal: 0 }}
            />
            <Input
              label={"Email"}
              labelStyle={styles.inputLabel}
              value={email.value}
              onChangeText={(value) => setEmail({ ...email, value: value })}
              errorMessage={email.errorMessage}
              style={styles.inputField}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              containerStyle={{ paddingHorizontal: 0 }}
            />

            <TouchableOpacity onPress={handleUpdateProfile} style={styles.updateContainer}>
              <Text style={styles.updateText}>Update</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleLogoutPress} style={styles.logoutContainer}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    borderColor: COLORS.darkGray,
    paddingHorizontal: 10,
  },
  updateText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  updateContainer: {
    marginTop: 10,
    backgroundColor: COLORS.primaryColor,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  logoutContainer: {
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  logoutText: {
    color: COLORS.danger,
    fontSize: 18,
  },
});
