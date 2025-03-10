import colors from "@/src/constants/colors";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from 'expo-router'
import { ScrollView } from "react-native";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { router } from 'expo-router'
import globalStyles from "@/src/constants/globalStyles";
import { Ubuntu } from '@/src/constants/fonts'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if (error){
      Alert.alert('Error', error.message)
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace('/(panel)/profile/PacientesScreen/page');
  }
    
  return(

    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>Bem-vindo ao <Text style={styles.logoText}>
           cicatrify
          </Text>
        </Text>
        <Text style={styles.slogan}>
          Acompanhamento por imagem de feridas de pacientes
        </Text>
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Digite seu email..."
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            placeholder="Digite sua senha..."
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Pressable style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>
            {loading ? 'Carregando...' : 'Acessar'}
          </Text>
        </Pressable>
      <Link style={styles.link} href={"/(auth)/signup/page"}>
      <Text>Ainda não possui uma conta? Cadastre-se</Text>
      </Link>
      </View>

    </SafeAreaView>

  )

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 34,
    backgroundColor: colors.purple80,

  },
  header: {
    paddingLeft: 14,
    paddingRight: 14,
  },
  headerText: {
    fontSize: globalStyles.large,
    color: colors.white,
    marginBottom: 8,
    fontFamily: Ubuntu.regular
  },
  logoText: {
    fontSize: globalStyles.large,
    color: colors.white,
    marginBottom: 8,
    fontFamily: Ubuntu.bold
  },
  slogan: {
    fontSize: globalStyles.large,
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
    color: colors.text,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 14
  },
  button: {
    backgroundColor: colors.purple80,
    paddingTop: 14,
    paddingBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold'
  },
  link: {
    marginTop: 16,
    textAlign: 'center'
  }
})