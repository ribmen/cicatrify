import GenericHeader from "@/src/components/GenericHeader";
import { PatientInfoCard } from "@/src/components/PatientInfoCard/PatientInfoCard";
import PlusButton from "@/src/components/PlusButton/PlusButton";
import { supabase } from "@/src/lib/supabase";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

// Tipagem do paciente retornado do Supabase
interface Patient {
  name: string;
  regions: string[];
}

interface IndexedRegion {
  name: string;
  index: number;
}

export default function ImagesOfPatient() {
  const [loading, setLoading] = useState<boolean>(false);
  const [patientName, setPatientName] = useState<string>("");
  const [patientRegion, setPatientRegion] = useState<string>("");

  const { id, index } = useLocalSearchParams();

  async function fetchPatientData() {
    setLoading(true);

    if (!id) {
      setLoading(false);
      return;
    }

    const { data: patient, error } = await supabase
      .from("patients")
      .select("name, regions")
      .eq("id", id)
      .single<Patient>(); // Tipa o retorno com a interface `Patient`

    if (error) {
      console.error("Erro ao buscar paciente:", error);
    } else if (patient) {
      setPatientName(patient.name);

      const indexedRegions: IndexedRegion[] = patient.regions.map((region, i) => ({
        name: region,
        index: i,
      }));

      const selectedRegion = indexedRegions.find((item) => item.index === Number(index));

      if (selectedRegion) {
        setPatientRegion(selectedRegion.name);
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchPatientData();
  }, []);

  return (
    <View style={{ flexGrow: 1 }}>
      <GenericHeader hasArrowBack={true} title="Imagens" />
      <SafeAreaView style={styles.container}>
        <PatientInfoCard icon="user" content={patientName} label="Paciente" />
        <PatientInfoCard icon="landPlot" content={patientRegion} label="Região" />
        <PlusButton />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
})
