import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/src/lib/supabase';
import colors from "@/src/constants/colors";

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });

    if (error) {
      Alert.alert('Erro', error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace('/(auth)/signin/page');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
              <View style={styles.header}>
                <Pressable style={styles.backButton} onPress={() => router.back()}>
                  <Ionicons name='arrow-back' size={24} color={colors.white} />
                </Pressable>

                <Text style={styles.logoText}>
                  Finance<Text style={{ color: colors.purple60 }}>Plus</Text>
                </Text>
                <Text style={styles.slogan}>Soluções de crédito simplificadas.</Text>
                <Text style={styles.slogan}>Criar uma conta</Text>
              </View>

              <View style={styles.form}>
                <View>
                  <Text style={styles.label}>Nome completo</Text>
                  <TextInput
                    placeholder="Nome completo"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    placeholder="Digite seu email..."
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View>
                  <Text style={styles.label}>Senha</Text>
                  <TextInput
                    placeholder="Digite sua senha..."
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                <Pressable style={styles.button} onPress={handleSignUp}>
                  <Text style={styles.buttonText}>{loading ? 'Carregando...' : 'Cadastrar'}</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 34,
    backgroundColor: colors.zinc,
  },
  header: {
    paddingLeft: 14,
    paddingRight: 14,
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  slogan: {
    fontSize: 30,
    color: colors.white,
    marginBottom: 34,
  },
  form: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 24,
    paddingLeft: 14,
    paddingRight: 14,
  },
  label: {
    color: colors.zinc,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingVertical: 14,
  },
  button: {
    backgroundColor: colors.green,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255, 0.55)',
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  }
});
