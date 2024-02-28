import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useState, useRef, useCallback } from "react";
import { GlobalStyles } from "../../global/GlobalStyles";
import { DEVICE_CATEGORIES } from "../../constants";
import DeviceCard from "../../components/DeviceCard";
import { Button, Input } from "@rneui/themed";
import AddDeviceModal from "./AddDeviceModal";
import useBackend from "../../hooks/useBackend";

const showCodeAlert = (title, message, onDismissed) => {
  const buttons = [
    {
      text: "Close",
      style: "default",
      onPress: onDismissed,
    },
  ];

  Alert.alert(title, message, buttons);
};

const AddDeviceScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [QRScannerVisible, setQRScannerVisible] = useState(false);
  const [cameraActivated, setCameraActivated] = useState(true);
  const { loading, registerEdgeDevice } = useBackend();
  const isProcessingQRCode = useRef(false);

  const [newDeviceName, setNewDeviceName] = useState({
    value: "",
    error: "",
  });
  const setDeviceName = (value) => {
    setNewDeviceName({ ...setNewDeviceName, value });
  };

  const onNextPress = () => {
    setNewDeviceName({ ...newDeviceName, error: "" });
    if (!newDeviceName.value) {
      setNewDeviceName({ ...newDeviceName, error: "Device name is required" });
      return;
    }
    setQRScannerVisible(true);
  };
  const closeModal = () => {
    setQRScannerVisible(false);
  };

  // const onCodeScanned = useCallback((codes) => {
  //   console.log(`Scanned ${codes.length} codes:`, codes);
  //   const value = codes[0]?.value;
  //   if (value == null) return;
  //   if (isProcessingQRCode.current) return;
  //   showCodeAlert("Successful", "Device is registered.", () => {
  //     isProcessingQRCode.current = false;
  //   });
  //   isProcessingQRCode.current = true;
  // }, []);

  const onCodeScanned = useCallback(async (codes) => {
    try {
      if (isProcessingQRCode.current) return;
      isProcessingQRCode.current = true;
      console.log(`Scanned ${codes.length} codes:`, codes);
      const value = codes[0]?.value;
      if (value == null) return;

      setCameraActivated(false);

      const device = {
        deviceID: value,
        deviceName: newDeviceName.value,
        category: selectedCategory,
      };

      const data = await registerEdgeDevice(device);
      console.log("data after registering device", data);

      showCodeAlert("Successful", "Device is registered.", () => {
        navigation.navigate("HomeScreen");
      });
    } catch (error) {
      showCodeAlert("Error", error.message, () => {
        closeModal();
        isProcessingQRCode.current = false;
        setCameraActivated(true);
      });
    }
  }, []);
  return (
    <View style={GlobalStyles.container}>
      <ScrollView
        style={styles.subContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.question}>
          Where will you be using this device?
        </Text>
        <View style={styles.categoriesContainer}>
          {Object.keys(DEVICE_CATEGORIES).map((categoryKey, index) => {
            const category = DEVICE_CATEGORIES[categoryKey];

            return (
              <DeviceCard
                selected={categoryKey === selectedCategory}
                iconName={category}
                label={categoryKey}
                iconType={"material-community"}
                key={categoryKey}
                iconSize={50}
                style={styles.categoryBtn}
                onPress={() => {
                  setSelectedCategory(categoryKey);
                }}
              />
            );
          })}
        </View>
        <View style={styles.form}>
          <Input
            value={newDeviceName.value}
            label="Device Name *"
            labelStyle={styles.inputLabel}
            placeholder="e.g Bedroom"
            onChangeText={setDeviceName}
            errorMessage={newDeviceName.error}
          />
          {selectedCategory && (
            <Button
              onPress={onNextPress}
              title={"Next"}
              containerStyle={styles.nextBtn}
              radius={"xl"}
              size="lg"
            />
          )}
        </View>
      </ScrollView>
      <AddDeviceModal
        visible={QRScannerVisible}
        closeModal={closeModal}
        onCodeScanned={onCodeScanned}
        loading={loading}
        cameraActivated={cameraActivated}
      />
    </View>
  );
};

export default AddDeviceScreen;

const styles = StyleSheet.create({
  categoryBtn: {
    width: "21%",
    height: "21%",
  },
  nextBtn: {
    width: "75%",
    marginVertical: 30,
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    paddingVertical: 10,
    alignSelf: "center",
  },
  question: {
    fontWeight: "700",
    fontSize: 16,
  },
  subContainer: {
    flexGrow: 1,
    paddingTop: 20,
  },
  inputLabel: { fontSize: 18, fontWeight: "500", color: "black" },
});
