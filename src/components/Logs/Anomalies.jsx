import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState, useRef } from "react";
import { GlobalStyles } from "../../global/GlobalStyles";
import useBackend from "../../hooks/useBackend";

import { COLORS } from "../../constants";
import { formatDateTime, getTime } from "../../util";

import LogSectionList from "./LogSectionList";
import { useNavigation } from "@react-navigation/native";

const Anomalies = ({ anomalies, setAnomalies }) => {
  const page = useRef(1);
  const navigation = useNavigation();
  const { loading, getAnomalies } = useBackend();

  const getNextPage = async () => {
    page.current += 1;
    const newLogs = await getAnomalies(page.current);
    let existingLogs = anomalies;
    newLogs.forEach((newLog) => {
      if (newLog.data.length === 0) return;
      const existingCategoryIndex = existingLogs.findIndex(
        (item) => item.title === newLog.title
      );
      if (existingCategoryIndex !== -1) {
        existingData[existingCategoryIndex].data.push(...newLog.data);
      } else {
        existingData.push(newLog);
      }
    });
  };

  useEffect(() => {
    const getAnomaliesFromServer = async () => {
      try {
        let logs = await getAnomalies();
        logs = logs
          .map((log) => {
            if (log.data.length == 0) return;
            return {
              ...log,
              title: log.title,
            };
          })
          .filter((item) => item !== undefined && item !== null && item !== "");
        setAnomalies(logs);
      } catch (error) {
        console.error("Error while fetching notifications", error);
      }
    };
    getAnomaliesFromServer();
  }, []);

  const AnomalyItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.anomalyContainer}
        onPress={() => {
          navigation.navigate("AnomalyClipScreen", { anomaly: item });
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.anomalyImage}
            source={{ uri: `data:image/png;base64,${item.thumbnail}` }}
          />
        </View>
        <View style={styles.anomalyInfoContainer}>
          <View style={styles.titleAndTimeContainer}>
            <Text style={styles.title}>Anomaly Detected</Text>
            <Text style={styles.timeText}>{`${getTime(item.occurredAt)}`}</Text>
          </View>
          <Text
            style={styles.cameraNameText}
          >{`${item.fromDevice.deviceName} • ${item.fromCamera.cameraName}`}</Text>
          <Text style={styles.cameraNameText}>
            {formatDateTime(item.createdAt).date}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[GlobalStyles.container]}>
      {anomalies.length == 0 && (
        <View style={styles.emptyStateTextContainer}>
          <Text style={styles.emptyStateText}>{`No anomalies to show.`}</Text>
        </View>
      )}

      <LogSectionList
        sections={anomalies}
        renderItem={AnomalyItem}
        refreshing={false}
        onRefresh={getAnomalies}
        onEndReached={getNextPage}
      />
    </View>
  );
};

export default Anomalies;

const styles = StyleSheet.create({
  title: {
    fontWeight: "500",
  },
  titleAndTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "500",
  },
  emptyStateTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  timeText: {
    color: COLORS.darkGray,
  },
  cameraNameText: {
    color: COLORS.darkGray,
  },

  anomalyInfoContainer: {
    width: "70%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 3,
  },
  anomalyImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imageContainer: {
    width: "30%",
    borderRadius: 10,
  },
  anomalyContainer: {
    flex: 1,
    flexDirection: "row",
    height: 100,
    backgroundColor: COLORS.white,
    padding: 10,
    marginTop: 10,
    elevation: 5,
    shadowColor: "#000",
    width: "95%",
    borderRadius: 20,
    shadowOffset: { width: 0, height: 2, shadowOpacity: 0.3, shadowRadius: 3 },
    alignSelf: "center",
  },
});
