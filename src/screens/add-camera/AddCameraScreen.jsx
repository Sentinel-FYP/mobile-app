import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AddCameraScreen = () => {
  const cameras = [
    {
      name: "Camera 6",
      ipAddress: "192.168.1.2",
      online: true,
    },
    {
      name: "Camera 7",
      ipAddress: "192.168.1.3",
      online: true,
    },
    {
      name: "Camera 8",
      ipAddress: "192.168.1.4",
      online: true,
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: "100%",
          padding: 10,
          height: 70,
          marginTop: 10,
          elevation: 1,
          backgroundColor: COLORS.white,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "75%",
            paddingRight: 30,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon size={32} color={COLORS.black} name="camera" />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontWeight: 700 }}>{item.name}</Text>
              <Text>{item.ipAddress}</Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#ECFDF5",
              borderRadius: 20,
              paddingHorizontal: 5,
              justifyContent: "center",
              paddingVertical: 2,
              marginLeft: 30,
            }}
          >
            <Text style={{ fontWeight: 500 }}>
              {item.online ? "Online" : "Offline"}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            width: "25%",
          }}
        >
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              backgroundColor: "#F7F8F9",
              borderRadius: 100,
              marginHorizontal: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon size={26} color={COLORS.danger} name="delete" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              backgroundColor: "#F7F8F9",
              borderRadius: 100,
              marginHorizontal: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon size={26} color={COLORS.black} name="plus" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: 25, paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: 500 }}>
          Discovered Cameras
        </Text>
        <FlatList data={cameras} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default AddCameraScreen;
