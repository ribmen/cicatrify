import { useState, useEffect } from 'react'
import { useAuth } from "@/src/contexts/AuthContext";
import { supabase } from "@/src/lib/supabase";
import { Text, StyleSheet, Button, Alert, View, FlatList, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PlusButton from "@/src/components/PlusButton/PlusButton";
import GenericHeader from "@/src/components/GenericHeader";
import { router } from "expo-router";
import { PatientCard } from '@/src/components/PatientsCard.tsx/Card';

export default function Profile() {
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState<any[] | null>([]);
  
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

  function handlePressPaciente() {
    router.push('/(panel)/profile/PacienteScreen.tsx/page')
  }

  async function getUserId() {
      const { data: { user } } = await supabase.auth.getUser();
  
      console.log(user?.id);
      return user?.id;
    }

  async function fetchUserPatients() {
    setLoading(true);
    const userId = await getUserId();

    if (!userId) {
      setLoading(false);
      return;
    }

    let { data: patients, error } = await supabase
      .from('patients')
      .select('*')
      .eq('nurse_id', userId)

    if (error) {
      console.log('Erro ao buscar pacientes: ', error.message);
    } else {
      setPatients(patients);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchUserPatients();
  }, [])




  return(
    <View style={{flexGrow: 1}}>
      <GenericHeader title="Pacientes" hasArrowBack={false}/>
      <SafeAreaView style={styles.container}>

        <Button
          title='Deslogar'
          onPress={handleSignOut}
        />

        <FlatList
          style={styles.patientsFlatList}
          data={patients}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PatientCard name={item.name} onPress={handlePressPaciente}/>}
          contentContainerStyle={{flexGrow: 1}}
        />

        <PlusButton onPress={handlePress}/>

      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  patientsFlatList: {
    flex: 1,
    marginTop: 30,
    marginRight: 24,
    marginLeft: 24,
  }
})