import colors from "@/src/constants/colors"
import { Ubuntu } from "@/src/constants/fonts";
import { 
  StyleSheet, 
  View,
  Text
 } from "react-native"
import { ForwardButton } from "./ForwardButton";

interface CardProps {
  name: string;
  onPress: () => void;
}

export const Card: React.FC<CardProps> = ({name, onPress}) => {
  return (
    <View style={styles.card}>
      <View style={{display: 'flex', flexDirection: "column"}}>
        <View style={styles.textPlace}>
        <Text style={styles.inputLabel}>Paciente</Text>
        <Text style={styles.inputValue}>{name}</Text>
      </View>

      </View>
      <ForwardButton onPress={onPress}/>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.white,
    boxShadow: '0px 2px 16px 0px rgba(191, 172, 200, 0.30)',
    height: 80,
    borderRadius: 10,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    marginBottom: 16
  },
  
  inputLabel: {
    color: "#C9C6D7",
    fontFamily: Ubuntu.regular,
    fontSize: 10,
    fontWeight: "400",
  },

  textPlace: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 8
  },

  inputValue: {
    color: "#4A4063",
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: "400",
  },
})