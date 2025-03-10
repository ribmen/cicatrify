import React from "react";
import { View, StyleSheet } from "react-native";
import { BackgroundShapes } from "./BackgroundShape";
import { WelcomeText } from "./LoginComponents";
import LoginCard from "./LoginComponents";

const LoginContainer: React.FC = () => {
  return (
    <View style={styles.container}>
      <BackgroundShapes />
      <WelcomeText />
      <LoginCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F1F1F1",
    position: "relative",
    overflow: "hidden",
  },
});

export default LoginContainer;
