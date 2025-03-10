import React from "react";
import { View, StyleSheet } from "react-native";

export const PasswordDots: React.FC = () => {
  return (
    <View style={styles.container}>
      {[...Array(10)].map((_, index) => (
        <View key={index} style={styles.dot} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4A4063",
  },
});
