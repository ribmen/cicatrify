import GenericHeader from "@/src/components/GenericHeader";
import {PatientCard} from "@/src/components/PatientCard.tsx/Card";
import PlusButton from "@/src/components/PlusButton/PlusButton";
import { supabase } from "@/src/lib/supabase";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

export default function PatientScreen() {
  const { id } = useLocalSearchParams();

  const idValue: string = Array.isArray(id) ? id[0] : id;
  
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState<any>();
  const [patientName, setPatientName] = useState('');
  const [patientBirthdate, setPatientBirthdate] = useState('');


  async function fetchUserPatients() {
    setLoading(true);
  
    if (!id) {
      setLoading(false);
      return;
    }
  
    let { data: patient, error } = await supabase
      .from('patients')
      .select('name, birthdate')
      .eq('id', id)
      .single(); // Garante que retorna um único objeto, não um array
  
    if (error) {
      console.log('Erro ao carregar dados de paciente: ', error.message);
    } else if (patient) {
      console.log(patient.name, patient.birthdate); // Agora acessa os valores corretamente
      setPatientName(patient.name);
      setPatientBirthdate(patient.birthdate)
      console.log('este é o id value: ', idValue)
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUserPatients();
  }, [])

  function handlePress() {
      router.push({
        pathname: '/profile/PacienteScreen/NovaRegiaoDo/[id]',
        params: {id: idValue}
      })
    };
  
  return (
    <View style={{flexGrow: 1}}>
      <GenericHeader title="Regiões" hasArrowBack={true}/>
      <SafeAreaView style={styles.container}>
      <PatientCard patientName={patientName} patientDatebirth={patientBirthdate}/>

      <PlusButton onPress={handlePress}/>
      </SafeAreaView>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      padding: 24
    },
})