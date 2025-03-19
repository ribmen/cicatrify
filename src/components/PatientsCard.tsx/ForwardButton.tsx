import colors from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";


interface ForwardButtonProps {
  onPress: () => void;
}

export const ForwardButton: React.FC<ForwardButtonProps> = ({onPress}) => {

  return (
    <TouchableOpacity style={styles.arrowButton} onPress={onPress}>
      <Ionicons name='arrow-forward' style={styles.arrowForward} size={28} color={colors.purple92} />
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  arrowButton: {
    height: '100%',
    aspectRatio: 1,
    backgroundColor: colors.purple60,
    borderRadius: 8,
    padding: 10
  },

  arrowForward: {
    height: '100%'
  }
})