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
          backgroundColor: "gray",
          justifyContent: "center",
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.black,
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
        width: 220,
        minHeight: 200,
        zIndex: 100,
        position: "absolute",
        right: 20,
        top: -50,
      }}
    >
      <FlatList data={moreOptions} renderItem={renderItem} />
    </View>
  );
};

export default MoreOptions;
