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
    flexDirection: 'row',
    top: 30,
    height: 80,
    paddingLeft: 14,
    paddingRight: 14,
    borderBottomWidth: 1,  
    borderBottomColor: "#C9C6D7",      
    alignItems: 'center',
    marginBottom: 30
  },

  headerTitleStyle: {
    position: 'absolute',
    textAlign: 'center',
    right: 0,
    left: 0,
    fontFamily: Ubuntu.bold,
    fontSize: globalStyles.large,
    color: colors.purple200,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 0,
    borderRadius: 8,
    marginBottom: 8,
    top: 15
  }
});

export default GenericHeader;