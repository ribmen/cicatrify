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
    position: 'absolute',
    width: 140,
    height: 127.292,
    transform: 'rotate(-36.959deg)',
    flexShrink: 0,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    borderBottomRightRadius: 44,
    borderBottomLeftRadius: 62,
    top: 40,
    left: 290,
    backgroundColor: "#783F8E",
  },
  smallShape: {
    position: 'absolute',
    width: 126.617,
    aspectRatio: 1,
    borderRadius: 40,
    top: 70,
    left: 230,
    transform: [{ rotate: "-27.327deg" }],
    backgroundColor: "#C9C6D7",
  },
});
