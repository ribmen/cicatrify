import React from "react";
import { View, StyleSheet } from "react-native";

export const BackgroundShapes: React.FC = () => {
  return (
    <>
      <View style={styles.largeShape} />
      <View style={styles.smallShape} />
    </>
  );
};

const styles = StyleSheet.create({
  largeShape: {
    width: 396,
    height: 360,
    borderTopLeftRadius: 102,
    borderTopRightRadius: 102,
    borderBottomRightRadius: 102,
    borderBottomLeftRadius: 140,
    position: "absolute",
    top: -259,
    left: -75,
    transform: [{ rotate: "-30.733deg" }],
    backgroundColor: "#783F8E",
  },
  smallShape: {
    width: 249,
    height: 249,
    borderRadius: 66,
    position: "absolute",
    top: -10,
    left: -97,
    transform: [{ rotate: "-33.47deg" }],
    backgroundColor: "#C9C6D7",
  },
});
