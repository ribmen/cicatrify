import { Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GenericHeader from "@/src/components/GenericHeader";

export default function Profile() {

  return(
    <ScrollView style={{flex: 1}}>
      <GenericHeader title="Novo paciente" hasArrowBack={true}/>
      
      <SafeAreaView style={styles.container}>
        <Text>Página de cadastro de paciente</Text>


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