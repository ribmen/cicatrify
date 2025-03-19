import { StyleSheet, TouchableOpacity, View} from "react-native";
import colors from "../../constants/colors";
import { PlusIcon } from "./PlusIcon";

interface PlusButtonProps {
  onPress?: () => void;
  disabled?: boolean;
}

export const PlusButton: React.FC<PlusButtonProps> = ({
  onPress,
  disabled = false
}) => {

  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={styles.touchable}
    >
      <View style={styles.container}>
        <PlusIcon/>
      </View>
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  touchable: {
    position: 'absolute',
    bottom: 80,
    right: 40,
    zIndex: 1
  },
  container: {
    width: 62,
    height: 62,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: colors.purple80
  },
});

export default PlusButton;
