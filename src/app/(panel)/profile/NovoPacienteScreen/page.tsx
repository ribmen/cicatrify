import { StyleSheet, ScrollView, View } from "react-native";
import GenericHeader from "@/src/components/GenericHeader";
import NovoPacienteCard from "./NovoPacienteCard";

export default function NewPatient() {

  return(
    <>
      <GenericHeader title="Novo paciente" hasArrowBack={true}/>
      <View style={styles.container}>
        <NovoPacienteCard/>
      </View>
    
    </>
  )

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 80
  }
})