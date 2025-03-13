import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { supabase } from "@/src/lib/supabase";
import { router } from "expo-router";
import { Ubuntu } from "@/src/constants/fonts";
import { InputField } from "@/src/components/InputField";
import colors from "@/src/constants/colors";

export const WelcomeText: React.FC = () => (
  <View style={styles.welcomeContainer}>
    <Text style={styles.welcomeText}>Bem-vindo ao <Text style={styles.cicatrifyText}>cicatrify!</Text></Text>
    
  </View>
);

const LoginButton: React.FC<{ onPress: () => void; loading: boolean }> = ({ onPress, loading }) => (
  <TouchableOpacity style={styles.loginButton} onPress={onPress} disabled={loading}>
    <Text style={styles.loginButtonText}>{loading ? "Carregando..." : "Fazer Login"}</Text>
  </TouchableOpacity>
);

const SignupSection: React.FC = () => (
  <View style={styles.signupContainer}>
    <Text style={styles.dividerText}>ou</Text>
    <TouchableOpacity style={styles.signupButton} onPress={() => router.push("/(auth)/signup/CadastroContainer")}>
      <Text style={styles.signupButtonText}>Cadastre-se</Text>
    </TouchableOpacity>
  </View>
);

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("Erro", error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace("/(panel)/profile/PacientesScreen/page");
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Login</Text>
        <Text style={styles.headerSubtitle}>Por favor, faça login para continuar</Text>
      </View>

      <InputField label="Usuário" value={email} onChangeText={setEmail} />
      <InputField label="Senha" value={password} onChangeText={setPassword} secureTextEntry />

      <LoginButton onPress={handleSignIn} loading={loading} />
      <SignupSection />
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    position: "absolute",
    top: 84,
    left: 48,
    width: 300
  },
  welcomeText: {
    fontFamily: Ubuntu.regular,
    fontSize: 26,
    fontWeight: "700",
    color: "#F1F1F1",
  },
  cicatrifyText: {
    fontFamily: Ubuntu.bold,
    fontSize: 26,
    fontWeight: "700",
    color: "#F1F1F1",
  },
  cardContainer: {
    display: 'flex',
    top: 360,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 345,
    padding: 24,
    borderRadius: 14,
    backgroundColor: "#F1F1F1",
    boxShadow: '0px 2px 16px 0px rgba(191, 172, 200, 0.30)',
    gap: 24,
  },
  headerContainer: {
    gap: 8,
  },
  headerTitle: {
    color: "#2C263C",
    fontFamily: colors.purple200,
    fontSize: 26,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "#4A4063",
    fontFamily: "Ubuntu",
    fontSize: 14,
    fontWeight: "400",
  },
  loginButton: {
    height: 56,
    borderRadius: 10,
    backgroundColor: "#783F8E",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFF",
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: "700",
  },
  signupContainer: {
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  dividerText: {
    color: "#C9C6D7",
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: "400",
  },
  signupButton: {
    height: 56,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  signupButtonText: {
    color: "#783F8E",
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: "500",
  },
});
