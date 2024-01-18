import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { COLORS } from "../constants";
const MoreOptions = ({ moreOptions }) => {
  console.log(moreOptions);
  const renderItem = ({ item, index }) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={{
          width: "100%",
          height: 40,

          justifyContent: "center",
          padding: 10,
          overflow: "visible",
        }}
        onPress={item.onPress}
      >
        <Text style={{ color: COLORS.black }}>{item.option}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        minWidth: 150,

        zIndex: 100,
        position: "absolute",
        right: 0,
        top: -80,
        backgroundColor: COLORS.white,
        alignItems: "center",
        overflow: "visible",
      }}
    >
      <FlatList data={moreOptions} renderItem={renderItem} />
    </View>
  );
};

export default MoreOptions;
