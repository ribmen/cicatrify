import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import colors from "@/src/constants/colors";
import { 
  Pressable, 
  Text,
  StyleSheet, 
  View 
} from 'react-native';
import globalStyles from '../constants/globalStyles';
import { Ubuntu } from '../constants/fonts';

interface GenericHeaderProps {
  title?: string;
  hasArrowBack: boolean;
}

function handlePress() {
  router.back();
}

const GenericHeader: React.FC<GenericHeaderProps> = ({title, hasArrowBack}) => {

  return (
    <View style={styles.header}>
      {hasArrowBack &&
        <Pressable style={styles.backButton} onPress={handlePress}>
          <Ionicons name='arrow-back' size={36} color={colors.purple92} />
        </Pressable>
      }

      {title && 
        <Text style={styles.headerTitleStyle}>{title}</Text>
      }

    </View>
  );
}

const styles = StyleSheet.create({
    header: {
      display: 'flex',
      position: 'fixed',
      flexDirection: 'row',
      top: 50,
      paddingLeft: 14,
      paddingRight: 14,
      borderBottomWidth: 1,  
      borderBottomColor: "#C9C6D7",      
      alignItems: 'center',
    },

    headerTitleStyle: {
      position: 'absolute',
      textAlign: 'center',
      right: 0,
      left: 0,
      fontFamily: Ubuntu.bold,
      fontSize: globalStyles.large,
      color: colors.purple200,
      marginBottom: 24
    },
    backButton: {
      alignSelf: 'flex-start',
      padding: 8,
      borderRadius: 8,
      marginBottom: 8,
    }
});

export default GenericHeader;