import colors from "@/src/constants/colors";
import { Ubuntu } from "@/src/constants/fonts";
import globalStyles from "@/src/constants/globalStyles";
import { StyleSheet, Text, View } from "react-native";

interface PatientInfoTextProps {
  label: string;
  content: string;
}

export const PatientInfoTexts: React.FC<PatientInfoTextProps> = ({label, content}) => {

  return (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.text}>{content}</Text>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8
  },

  label: {
    fontFamily: Ubuntu.regular,
    fontSize: globalStyles.small,
    color: colors.purple80
  },

  text: {
    fontFamily: Ubuntu.regular,
    fontSize: globalStyles.medium,
    color: colors.white
  }
})