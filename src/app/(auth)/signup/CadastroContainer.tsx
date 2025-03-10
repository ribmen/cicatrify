import React from "react";
import { 
  View, 
  StyleSheet, 
  KeyboardAvoidingView, 
  SafeAreaView, 
  Platform, 
  ScrollView 
} from "react-native";
import CadastroCard from "./CadastroComponents";
import CadastroHeader from "./CadastroHeader";

const LoginContainer: React.FC = () => {
  return (
    <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <CadastroHeader />
          <CadastroCard />
        </View>
        </ScrollView>
    </KeyboardAvoidingView>
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
