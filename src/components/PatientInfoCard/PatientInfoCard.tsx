import colors from "@/src/constants/colors";
import { StyleSheet, View } from "react-native";
import { PatientInfoTexts } from "./PatientInfoTexts";
import PatientInfoCardPin from "./PatientInfoCardPin";

interface PatientInfoCardProps {
  label: string;
  content: string;
  icon: string;
}

export function PatientInfoCard({label, content, icon}: PatientInfoCardProps) {

  return (
    <View style={styles.container}>
      <PatientInfoCardPin icon={icon}/>
      <PatientInfoTexts label={label} content={content} />
    </View>
  )
}



const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    height: 90,
    alignSelf: 'stretch',
    gap: 12,
    alignItems: 'center',

    borderRadius: 10,
    backgroundColor: colors.purple60,
    marginBottom: 16,
    marginHorizontal: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,

  }
})