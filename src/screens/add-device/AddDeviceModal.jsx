import { useCallback, useRef, useState, useEffect } from "react";
import {
  Alert,
  AlertButton,
  Linking,
  StyleSheet,
  View,
  Modal,
} from "react-native";
import {
  Code,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";
import { Camera } from "react-native-vision-camera";
import { PressableOpacity } from "react-native-pressable-opacity";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/core";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Button } from "@rneui/base";
import { GlobalStyles } from "../../global/GlobalStyles";
import { Text } from "@rneui/themed";
import { COLORS } from "../../constants";

const showCodeAlert = (value, onDismissed) => {
  const buttons = [
    {
      text: "Close",
      style: "cancel",
      onPress: onDismissed,
    },
  ];
  if (value.startsWith("http")) {
    buttons.push({
      text: "Open URL",
      onPress: () => {
        Linking.openURL(value);
        onDismissed();
      },
    });
  }
  Alert.alert("Scanned Code", value, buttons);
};

export default function AddDeviceModal({ visible, closeModal }) {
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState(false);
  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    });

    const cameraPermissionStatus = await check(permission);

    if (cameraPermissionStatus === RESULTS.GRANTED) {
      console.log("Camera permission already granted");
      setCameraPermissionStatus(true);
    } else {
      requestCameraPermission();
    }
  };

  const requestCameraPermission = async () => {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    });

    try {
      const result = await request(permission);
      if (result === RESULTS.GRANTED) {
        console.log("Camera permission granted");
        setCameraPermissionStatus(true);
      } else {
        console.log("Camera permission denied");
      }
    } catch (error) {
      console.error("Error requesting camera permission: ", error);
    }
  };

  // console.log("Camera available:", Camera.getAvailableCameraDevices());

  // 1. Use a simple default back camera
  const device = useCameraDevice("back");

  // 2. Only activate Camera when the app is focused and this screen is currently opened
  const isFocused = useIsFocused();
  const isForeground = true;
  const isActive = isFocused && isForeground;

  // 3. (Optional) enable a torch setting
  const [torch, setTorch] = useState(false);

  // 4. On code scanned, we show an aler to the user
  const isShowingAlert = useRef(false);

  const onCodeScanned = useCallback((codes) => {
    console.log(`Scanned ${codes.length} codes:`, codes);
    const value = codes[0]?.value;
    if (value == null) return;
    if (isShowingAlert.current) return;
    showCodeAlert(value, () => {
      isShowingAlert.current = false;
    });
    isShowingAlert.current = true;
  }, []);

  // 5. Initialize the Code Scanner to scan QR codes and Barcodes
  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: onCodeScanned,
  });

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {!cameraPermissionStatus ? (
          <View style={GlobalStyles.container}>
            <Text style={styles.permissionRequestText}>
              Please give camera permission for QR Scanner to work.
            </Text>
            <Button
              color="primary"
              title={"Click Here to Request Camera Access"}
              size="lg"
              containerStyle={{ width: 300, borderRadius: 5 }}
              onPress={requestCameraPermission}
            />
          </View>
        ) : (
          <View style={GlobalStyles.centeredContainer}>
            {device != null && (
              <View style={styles.cameraContainer}>
                <Camera
                  style={StyleSheet.absoluteFill}
                  device={device}
                  isActive={isActive}
                  codeScanner={codeScanner}
                  torch={torch ? "on" : "off"}
                  enableZoomGesture={true}
                />
              </View>
            )}
            <Text style={styles.instructionsText}>
              Scan the QR code of your device.
            </Text>
            <View style={styles.rightButtonRow}>
              <PressableOpacity
                style={styles.button}
                onPress={() => setTorch(!torch)}
                disabledOpacity={0.4}
              >
                <IonIcon
                  name={torch ? "flash" : "flash-off"}
                  color="white"
                  size={24}
                />
              </PressableOpacity>
            </View>

            {/* Back Button */}
            <PressableOpacity style={styles.backButton} onPress={closeModal}>
              <IonIcon name="close-outline" color={COLORS.black} size={35} />
            </PressableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    width: "100%",
    flex: 0.6,
    alignSelf: "center",
  },
  instructionsText: {
    color: COLORS.black,
    fontSize: 18,
    marginTop: 20,
    fontWeight: 700,
  },
  permissionRequestText: {
    padding: 10,
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginBottom: 20,
    width: 150,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(140, 140, 140, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  rightButtonRow: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 10,
  },
});
