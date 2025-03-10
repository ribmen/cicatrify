import React from "react";
import { View, StyleSheet } from "react-native";

export const BackgroundShapes: React.FC = () => {
  return (
    <>
      <View style={styles.smallShape} />
      <View style={styles.largeShape} />
    </>
  );
};

const styles = StyleSheet.create({
  largeShape: {
    width: 396.25,
    height: 360.282,
    transform: 'rotate(-30.733deg)',
    flexShrink: 0,
    borderTopLeftRadius: 102,
    borderTopRightRadius: 102,
    borderBottomRightRadius: 102,
    borderBottomLeftRadius: 140,
    position: "absolute",
    top: -159,
    left: 0,
    backgroundColor: "#783F8E",
  },
  smallShape: {
    width: 249,
    height: 249,
    borderRadius: 66,
    position: "absolute",
    top: 60,
    left: -50,
    transform: [{ rotate: "-33.47deg" }],
    backgroundColor: "#C9C6D7",
  },
});
