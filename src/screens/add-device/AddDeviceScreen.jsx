import { useCallback, useRef, useState, useEffect } from "react";
import { Alert, AlertButton, Linking, StyleSheet, View } from "react-native";
import {
  Code,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";
import { Camera } from "react-native-vision-camera";
import { PressableOpacity } from "react-native-pressable-opacity";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/core";

// you may also import just the functions or constants that you will use from this library
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Button } from "@rneui/base";
import { GlobalStyles } from "../../global/GlobalStyles";
import { Text } from "@rneui/themed";

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

export default function CodeScannerPage({ navigation }) {
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
    <View style={styles.container}>
      {!cameraPermissionStatus ? (
        <View style={GlobalStyles.container}>
          <Text
            style={{
              padding: 10,
              fontSize: 16,
              fontWeight: "800",
              textAlign: "center",
            }}
          >
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
        <>
          {device != null && (
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={isActive}
              codeScanner={codeScanner}
              torch={torch ? "on" : "off"}
              enableZoomGesture={true}
            />
          )}

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
          <PressableOpacity
            style={styles.backButton}
            onPress={navigation.goBack}
          >
            <IonIcon name="close-outline" color="white" size={35} />
          </PressableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
