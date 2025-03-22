import colors from "@/src/constants/colors";
import { Ubuntu } from "@/src/constants/fonts";
import globalStyles from "@/src/constants/globalStyles";
import { View, Text, StyleSheet } from "react-native";

interface TextInfoProps {
  label: string;
  info: string;
}

export const TextInfo: React.FC<TextInfoProps> = ({label, info}) => {

  return (
    <View style={styles.textContainer}>
      <Text style={styles.textLabel}>{label}</Text>
      <Text style={styles.textInfo}>{info}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
   textContainer: {
      gap: 6
    },
  
    textLabel: {
      fontSize: globalStyles.small,
      color: colors.purple80
    },
  
    textInfo: {
      fontSize: globalStyles.medium,
      color: colors.white,
      fontFamily: Ubuntu.regular
    }
})