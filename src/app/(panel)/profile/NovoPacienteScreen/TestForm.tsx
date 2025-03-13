import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  TextInput 
} from "react-native";
import { supabase } from "@/src/lib/supabase"; // Ajuste o caminho conforme necessário
import { router } from "expo-router";

export default function TestPatientForm() {
  // Estados para os campos do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para enviar os dados para o Supabase
  const handleSubmit = async () => {
    setLoading(true); // Ativa o estado de carregamento

    try {
      // Obtém o ID do usuário autenticado
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("Usuário não autenticado.");
      }

      // Envia os dados para a tabela 'patients'
      const { data, error } = await supabase
        .from("patients")
        .insert({
          name: name,
          email: email,
          birthdate: birthdate,
          nurse_id: user.id, // Associa o paciente ao enfermeiro autenticado
        });

      if (error) {
        throw error; // Lança o erro para ser capturado no catch
      }

      // Log de sucesso
      console.log("Paciente cadastrado com sucesso:", data);
      Alert.alert("Sucesso", "Paciente cadastrado com sucesso!");

      // Redireciona para a tela de pacientes
      router.replace("/(panel)/profile/PacientesScreen/page");
    } catch (error: any) {
      // Log de erro
      console.error("Erro ao cadastrar paciente:", error);
      Alert.alert("Erro", error.message || "Ocorreu um erro ao cadastrar o paciente.");
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Paciente</Text>

      {/* Campo para o nome */}
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
      />

      {/* Campo para o e-mail */}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo para a data de nascimento */}
      <TextInput
        style={styles.input}
        placeholder="Data de nascimento (YYYY-MM-DD)"
        value={birthdate}
        onChangeText={setBirthdate}
      />

      {/* Botão de cadastro */}
      <TouchableOpacity 
        style={[styles.button, loading && styles.disabledButton]} 
        onPress={handleSubmit} 
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Carregando..." : "Cadastrar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos da página
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#783F8E",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc", // Cor de fundo quando o botão está desabilitado
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});