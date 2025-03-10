import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import colors from "@/src/constants/colors";
import { 
  Pressable, 
  StyleSheet, 
  View 
} from 'react-native';

export default function CadastroHeader() {

  return (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
      <Ionicons name='arrow-back' size={36} color={colors.purple92} />
      </Pressable>
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
    },
    backButton: {
      alignSelf: 'flex-start',
      padding: 8,
      borderRadius: 8,
      marginBottom: 8,
    }
});