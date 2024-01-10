import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5", // 원하는 배경색으로 설정
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: "#000", // 원하는 텍스트 색상으로 설정
  },
});

export default LoadingScreen;
