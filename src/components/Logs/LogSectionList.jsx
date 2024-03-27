import { View, Text, SectionList, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../../constants";

const LogSectionList = ({
  sections,
  renderItem,
  refreshing,
  onRefresh,
  onEndReached,
}) => {
  const sectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => index}
      renderItem={renderItem}
      renderSectionHeader={sectionHeader}
      style={styles.sectionList}
      contentContainerStyle={styles.containerStyle}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
    />
  );
};

export default LogSectionList;

const styles = StyleSheet.create({
  containerStyle: {
    flexGrow: 1,
  },
  sectionHeader: {
    paddingLeft: 15,
    paddingTop: 10,
    color: COLORS.darkGray,
  },
  sectionList: {
    flex: 1,
    width: "100%",
  },
});
