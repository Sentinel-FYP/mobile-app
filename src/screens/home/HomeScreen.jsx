import { View, Text, FlatList } from "react-native";
import { useState } from "react";
import { GlobalStyles } from "../../global/GlobalStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../constants";

const HomeScreen = () => {
  const [devices, setDevices] = useState([
    {
      name: "Sentinel Office",
      cameras: [
        { name: "Cam1" },
        { name: "Cam2" },
        { name: "Cam3" },
        { name: "Cam4" },
      ],
    },
  ]);

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: "100%",
          paddingHorizontal: 30,
          marginTop: 20,
        }}
      >
        <View style={{ width: "100%", height: 300 }}>
          <Text style={{ fontSize: 18, fontWeight: 500 }}>{item.name}</Text>
          <View style={{ width: "100%", flex: 1 }}>
            <View
              style={{
                flex: 1,
                width: "100%",
                flexDirection: "row",
                flexWrap: "wrap",

                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.cameras.map((camera, index) => {
                return (
                  <View
                    key={camera.name}
                    style={{
                      width: "50%",
                      height: "50%",
                      borderColor: "black",
                      borderWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text>{camera.name}</Text>
                  </View>
                );
              })}
            </View>
            <View
              style={{
                width: "100%",
                height: 40,
                borderWidth: 1,
                borderColor: "black",
                borderTopWidth: 0,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Icon name="delete" color={COLORS.black} size={30} />
              <Icon name="group" color={COLORS.black} size={30} />
              <Icon name="eye" color={COLORS.black} size={30} />
              <Icon name="dots-vertical" color={COLORS.black} size={30} />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={GlobalStyles.container}>
      <FlatList
        style={{ flex: 1, width: "100%" }}
        data={devices}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeScreen;
