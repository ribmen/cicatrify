import { GenericCard } from "@/src/components/GenericCard.tsx/Card";
import GenericHeader from "@/src/components/GenericHeader";
import {PatientCard} from "@/src/components/PatientCard.tsx/Card";
import PlusButton from "@/src/components/PlusButton/PlusButton";
import { supabase } from "@/src/lib/supabase";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

export default function PatientScreen() {
  type IndexedRegion = {
    name: string;
    index: number;
  }

  const { id } = useLocalSearchParams();

  const idValue: string = Array.isArray(id) ? id[0] : id;

  const [regions, setRegions] = useState<IndexedRegion[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState<any>();
  const [patientRegions, setPatientRegions] = useState<string>();
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
      .select('name, birthdate, regions')
      .eq('id', id)
      .single(); // Garante que retorna um único objeto, não um array
  
    if (error) {
      console.log('Erro ao carregar dados de paciente: ', error.message);
    } else if (patient) {
      console.log(patient.name, patient.birthdate);
      console.log("este é o paciente: ", patient);
      setPatientName(patient.name);
      setPatientBirthdate(patient.birthdate);
      setPatientRegions(patient.regions);

      const regions: { name: string; index: number}[] = patient.regions.map((region: string, index: number) => ({
        name: region,
        index: index
      }));

      setRegions(regions);
      console.log("AS REGIOES: ", regions);




      console.log('este é o id value: ', idValue)
      console.log("estas são as regiões do paciente: ", patientRegions)
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
      console.log("Clicado nova REGIAO")
    };
  
  function handlePressGenericCard(id: string, index: number) {
      router.push({
        pathname: '/(panel)/profile/PacienteScreen/ImagensDo/[id]',
        params: {id: id, index: index}
      })/* 
      console.log("Clicado");
      console.log('Este é o index: ', index) */
    };
  
  return (
    <View style={{flexGrow: 1}}>
      <GenericHeader title="Regiões" hasArrowBack={true}/>
      <SafeAreaView style={styles.container}>
      <PatientCard patientName={patientName} patientDatebirth={patientBirthdate}/>

        <FlatList
          style={styles.patientsFlatList}
          data={regions}
          renderItem={({ item, index }) => 
          <GenericCard 
            name={item.name} 
            index={item.index}
            id={idValue} 
            label="Região"
            onPress={() => handlePressGenericCard(idValue, index)}
           />
          }
          contentContainerStyle={{flexGrow: 1}}
        />

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
  
    patientsFlatList: {
      flex: 1,
      marginTop: 30,
      marginRight: 24,
      marginLeft: 24,
    }
})