import { View, Text } from "react-native";
import { useState } from "react";
import { GlobalStyles } from "../../global/GlobalStyles";
import { DEVICE_CATEGORIES } from "../../constants";
import DeviceCard from "../../components/DeviceCard";

const AddDeviceScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <View style={GlobalStyles.container}>
      <View style={{ flex: 0.7, paddingTop: 20 }}>
        <Text style={{ fontWeight: 700, fontSize: 16 }}>
          Where will you be using this device?
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 5,
            paddingVertical: 10,
            alignSelf: "center",
          }}
        >
          {Object.keys(DEVICE_CATEGORIES).map((categoryKey, index) => {
            const category = DEVICE_CATEGORIES[categoryKey];

            return (
              <DeviceCard
                selected={category === selectedCategory}
                iconName={category}
                label={categoryKey}
                iconType={"material-community"}
                key={categoryKey}
                iconSize={50}
                style={{
                  width: "29%",
                  height: "29%",
                }}
                onPress={() => {
                  setSelectedCategory(category);
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default AddDeviceScreen;
