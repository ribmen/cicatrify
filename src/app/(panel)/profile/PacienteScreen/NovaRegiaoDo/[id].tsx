import GenericHeader from "@/src/components/GenericHeader";
import { InputField } from "@/src/components/InputField";
import { supabase } from "@/src/lib/supabase";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker'

export default function NovaRegiao() {
  const [selectedValue, setSelectedValue] = useState("");
  const { id } = useLocalSearchParams();
  const idValue: string | number = id[0];
  const [loading, setLoading] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientBirthdate, setPatientBirthdate] = useState('');
  const [regiao, setRegiao] = useState('');

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
      }
      setLoading(false);
    }

    useEffect(() => {
        fetchUserPatients();
      }, [])

    function handlePress() {
      rou
    }

    const SubmitButton: React.FC<{ onPress: () => void; loading: boolean }> = ({ onPress, loading }) => (
      <TouchableOpacity style={styles.loginButton} onPress={onPress} disabled={loading}>
        <Text style={styles.loginButtonText}>{loading ? "Carregando..." : "Adicionar região"}</Text>
      </TouchableOpacity>
    );

  return (
    <View style={{flexGrow: 1}}>
      <GenericHeader title="Nova região" hasArrowBack={true}/>

      <View style={styles.cardContainer}>
      <InputField label="Nome do paciente" value={patientName} editable={false}/>
      <InputField label="Região" value={regiao} editable={true} onChangeText={setRegiao}/>
      <SubmitButton onPress={handlePress}/>
      </View>

      
      
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    top: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 345,
    padding: 24,
    borderRadius: 14,
    backgroundColor: "#F1F1F1",
    boxShadow: '0px 2px 16px 0px rgba(191, 172, 200, 0.30)',
    gap: 24,
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
})