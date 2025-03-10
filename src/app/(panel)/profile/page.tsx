import { useAuth } from "@/src/contexts/AuthContext";
import { supabase } from "@/src/lib/supabase";
import { Text, StyleSheet, Button, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { setAuth } = useAuth();
  
  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    setAuth(null);

    if (error) {
      Alert.alert('Error', 'Erro ao sair da conta, tente mais tarde.')
    }
  }
  return(
    <ScrollView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <Text>Página Perfil Login</Text>

        <Button
          title='Deslogar'
          onPress={handleSignOut}
        />

      </SafeAreaView>
    </ScrollView>
  )

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})