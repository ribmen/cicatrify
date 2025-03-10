import { 
  StyleSheet, 
  View,
  Text
} from 'react-native';
import globalStyles from '@/src/constants/globalStyles';

export default function PacientesHeader() {

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitleStyle}>Pacientes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
      top: 50,
      paddingLeft: 14,
      paddingRight: 14,
      borderBottomWidth: 1,  
      borderBottomColor: "#C9C6D7",
      alignItems: 'center'
    },
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: globalStyles.large,
      marginBottom: 24
    }
});