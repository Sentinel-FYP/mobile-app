import {
  View,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Button, Icon, Input, Text } from "@rneui/themed";
import React from "react";

const AddCamera = ({
  cameraName,
  ipAddress,
  username,
  password,
  onClose,
  onAddCameraPress,
  onCameraNameChange,
  onIpAddressChange,
  onUsernameChange,
  onPasswordChange,
  ...props
}) => {
  return (
    <Modal {...props}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always"
      >
        <View
          style={{
            width: "100%",
            alignItems: "flex-end",
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={32} />
          </TouchableOpacity>
        </View>

        <Text style={styles.heading} h3>
          Add Camera Details
        </Text>
        <Input
          value={cameraName.value}
          label="Camera Name"
          labelStyle={styles.inputLabel}
          placeholder="e.g Office Camera"
          onChangeText={onCameraNameChange}
          errorMessage={cameraName.error}
        />
        <Input
          value={ipAddress.value}
          label="IP Address"
          labelStyle={styles.inputLabel}
          placeholder="e.g 192.168.1.1"
          onChangeText={onIpAddressChange}
          errorMessage={ipAddress.error}
        />
        <Input
          value={username.value}
          label="Username"
          labelStyle={styles.inputLabel}
          placeholder="Camera username"
          onChangeText={onUsernameChange}
          errorMessage={username.error}
        />
        <Input
          value={password.value}
          label="Password"
          labelStyle={styles.inputLabel}
          placeholder="Camera password"
          onChangeText={onPasswordChange}
          secureTextEntry
          errorMessage={password.error}
        />
        <Text style={{ width: "100%", padding: 10 }}>
          Note: If your camera do not have a username and password leave those
          fields empty.
        </Text>
        <Button
          title={"Add Camera"}
          onPress={onAddCameraPress}
          radius={"md"}
          size="lg"
          containerStyle={{ marginVertical: 30, width: 200 }}
        />
      </ScrollView>
    </Modal>
  );
};

export default AddCamera;

const styles = StyleSheet.create({
  buttonText: {
    color: "#000000",
    fontWeight: 500,
  },
  heading: {
    marginVertical: 30,
  },
  container: {
    paddingHorizontal: 10,
    alignItems: "center",
    flexGrow: 1,
  },
  inputLabel: { fontSize: 18, fontWeight: "500", color: "black" },
});
