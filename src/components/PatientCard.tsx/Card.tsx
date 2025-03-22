import colors from "@/src/constants/colors";
import { StyleSheet, Text, View } from "react-native";
import { BackgroundShapes } from "./BackgroundShapes";
import globalStyles from "@/src/constants/globalStyles";
import { Ubuntu } from "@/src/constants/fonts";
import { TextInfo } from "./TextInfo";

interface PatientCardProps {
  patientName: string;
  patientDatebirth: string;
}

export const PatientCard: React.FC<PatientCardProps> = ({patientName, patientDatebirth}) => {
  return (
    <View style={styles.container}>

    <View style={styles.cardContainer}>
      <TextInfo label="Nome do paciente" info={patientName}/>
      <TextInfo label="Data de nascimento" info={patientDatebirth}/>
    </View>
    <BackgroundShapes/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignSelf: 'stretch', //width: 100% ignora paddings, passa por cima mesmo
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
    height: 118,
    backgroundColor: colors.purple60,
    overflow: 'hidden',
    borderRadius: 10
  },

  cardContainer: {
    gap: 12
  },
})