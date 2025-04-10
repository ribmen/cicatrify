import GenericHeader from "@/src/components/GenericHeader";
import { InputField } from "@/src/components/InputField";
import { supabase } from "@/src/lib/supabase";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function NovaRegiao() {
  const [region, setRegion] = useState<string>('');
  const { id } = useLocalSearchParams();
  const idValue: string | number = id[0];
  const [loading, setLoading] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [existingRegions, setExistingRegions] = useState<string[]>([]);

  async function fetchUserPatients() {
    setLoading(true);
    
    if (!id) {
      setLoading(false);
      return;
    }
    
    const { data: patient, error } = await supabase
      .from('patients')
      .select('name, regions')
      .eq('id', id)
      .single();
    
    if (error) {
      console.log('Erro ao carregar dados de paciente: ', error.message);
      return;
    } else if (patient) {
      console.log(patient.name);
      setPatientName(patient.name);
      // Armazena as regiões existentes no estado
      setExistingRegions(patient.regions || []);
    }
    console.log('Regiões chegadas:', existingRegions);
    setLoading(false);
  }

  useEffect(() => {
    fetchUserPatients();
  }, []);

  async function handlePress() {
    if (!region.trim()) return; // Não permite regiões vazias
    
    setLoading(true);
    console.log("id do paciente: ", id)

    try {
      // Cria um novo array com as regiões existentes + a nova
      const updatedRegions = [...existingRegions, region.trim()];
    

      console.log('Regiões antes:', existingRegions);
      
      const { error } = await supabase
        .from('patients')
        .update({ regions: updatedRegions })
        .eq('id', id);
      
      if (error) {
        console.error("Erro ao atualizar regiões: ", error);
        return;
      }
      
      // Atualiza o estado local com as novas regiões
      setExistingRegions(updatedRegions);
      setRegion(''); // Limpa o input após adicionar
      
      console.log('Regiões atualizadas:', updatedRegions);
      
      router.back();
    } catch (error) {
      console.error("Erro no processo: ", error);
    } finally {
      setLoading(false);
    }
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
      <InputField label="Região" value={region} editable={true} onChangeText={setRegion}/>
      <SubmitButton onPress={handlePress} loading={loading}/>
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