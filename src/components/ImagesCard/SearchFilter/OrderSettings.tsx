import * as React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import OrderIcon from "./OrderIcon";

export const OrderSettings: React.FC = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <OrderIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#BFACC8",
    alignSelf: "stretch",
    marginVertical: "auto",
    minHeight: 42,
    paddingHorizontal: 9,
    width: 42,
    height: 42,
    overflow: "hidden",
  },
  image: {
    width: 24,
    height: 24,
  },
});
