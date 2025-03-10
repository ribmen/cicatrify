import { useAuth } from "@/src/contexts/AuthContext";
import { supabase } from "@/src/lib/supabase";
import { Text, StyleSheet, Button, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PlusButton from "@/src/components/PlusButton/PlusButton";
import GenericHeader from "@/src/components/GenericHeader";
import { router } from "expo-router";

export default function Profile() {
  const { setAuth } = useAuth();
  
  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    setAuth(null);

    if (error) {
      Alert.alert('Error', 'Erro ao sair da conta, tente mais tarde.')
    }
  };

  function handlePress() {
    router.push('/(panel)/profile/NovoPacienteScreen/page')
  };

  return(
    <ScrollView style={{flex: 1}}>
      <GenericHeader title="Pacientes" hasArrowBack={true}/>
      <SafeAreaView style={styles.container}>
        <Text>Página Perfil Login</Text>

        <Button
          title='Deslogar'
          onPress={handleSignOut}
        />

        <PlusButton onPress={handlePress}/>

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