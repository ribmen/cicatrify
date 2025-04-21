import colors from "@/src/constants/colors";
import { Ubuntu } from "@/src/constants/fonts";
import globalStyles from "@/src/constants/globalStyles";
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

export const OrderSelection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.orderLabel}>Ordem</Text>
      <Text style={styles.orderValue}>Mais recentes primeiro</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    marginVertical: "auto",
  },
  orderLabel: {
    color: colors.purple66,
    fontFamily: Ubuntu.regular,
    fontSize: globalStyles.small,
  },
  orderValue: {
    color: colors.purple200,
    marginTop: 8,
    fontFamily: Ubuntu.regular,
    fontSize: globalStyles.medium,
  },
});
