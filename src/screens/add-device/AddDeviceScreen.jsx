import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { GlobalStyles } from "../../global/GlobalStyles";
import { DEVICE_CATEGORIES } from "../../constants";
import DeviceCard from "../../components/DeviceCard";
import { Button, Input } from "@rneui/themed";
import AddDeviceModal from "./AddDeviceModal";

const AddDeviceScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [QRScannerVisible, setQRScannerVisible] = useState(false);
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
      <AddDeviceModal visible={QRScannerVisible} closeModal={closeModal} />
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
