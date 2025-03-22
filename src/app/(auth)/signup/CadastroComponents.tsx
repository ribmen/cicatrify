import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, KeyboardTypeOptions } from "react-native";
import { supabase } from "@/src/lib/supabase";
import { router } from "expo-router";
import { Ubuntu } from "@/src/constants/fonts";
import { InputFieldProps } from "@/src/interfaces/InputFieldProps";
import { InputField } from "@/src/components/InputField";

const CadastroButton: React.FC<{ onPress: () => void; loading: boolean }> = ({ onPress, loading }) => (
  <TouchableOpacity style={styles.cadastroButton} onPress={onPress} disabled={loading}>
    <Text style={styles.cadastroButtonText}>{loading ? "Carregando..." : "Cadastrar"}</Text>
  </TouchableOpacity>
);


export default function CadastroCard() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setLoading(!loading);

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: {
          name,
        } 
      }
    });

    if (error) {
      Alert.alert('Erro', error.code);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace('/(auth)/signin/LoginContainer');
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Cadastro</Text>
        <Text style={styles.headerSubtitle}>Cadastre-se e tenha acesso ao <Text style={styles.cicatrifySubtitle}>cicatrify</Text></Text>
      </View>

      <InputField label="Nome completo" value={name} onChangeText={setName} />
      <InputField keyboardType="email-address" autoCapitalize="none" label="E-mail" value={email} onChangeText={setEmail} />
      <InputField label="Usuário" autoCapitalize="none" value={username} onChangeText={setUsername} />
      <InputField label="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      <InputField label="Confirme a senha" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

      <CadastroButton onPress={handleSignUp} loading={loading} />
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
    top: 100,
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
    fontFamily: "Ubuntu",
    fontSize: 26,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "#4A4063",
    fontFamily: Ubuntu.regular,
    fontSize: 14,
    fontWeight: "400",
  },
  cicatrifySubtitle: {
    color: "#4A4063",
    fontFamily: Ubuntu.bold,
    fontSize: 14,
    fontWeight: "400",
  },
  
  cadastroButton: {
    height: 56,
    borderRadius: 10,
    backgroundColor: "#783F8E",
    justifyContent: "center",
    alignItems: "center",
  },
  cadastroButtonText: {
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
