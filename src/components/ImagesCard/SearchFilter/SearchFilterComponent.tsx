import * as React from "react";
import { View, StyleSheet } from "react-native";

import { OrderSettings } from "./OrderSettings";
import { OrderSelection } from "./OrderSelector";

const SearchFilterComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <OrderSelection />
      <OrderSettings />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default SearchFilterComponent;
