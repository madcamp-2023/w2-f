import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const LabelInput = ({ label, value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={String(value)}
        placeholder={placeholder}
      />
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  label: {
    flexBasis: 60,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
  },
});

export default LabelInput;
