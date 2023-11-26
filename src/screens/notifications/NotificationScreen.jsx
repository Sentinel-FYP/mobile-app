import { View, Text, FlatList } from "react-native";
import React from "react";

const NotificationScreen = () => {
  const renderItem = ({ item, index }) => {
    return <View></View>;
  };
  return (
    <View>
      <Text>Notifications</Text>

      <FlatList />
    </View>
  );
};

export default NotificationScreen;
