import colors from "@/src/constants/colors";
import { Ubuntu } from "@/src/constants/fonts";
import globalStyles from "@/src/constants/globalStyles";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"

interface DescriptionSectionProps {
  photoDate: string;
  photoDescription: string;
}

export const DescriptionSection = ({photoDate, photoDescription}: DescriptionSectionProps) => {
  return (
    <>
      {
        photoDescription ?
          (
            <View style={styles.container}>
              <View>
                <Text style={styles.label}>Data</Text>
                <Text style={styles.date}>{photoDate}</Text>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.label}>Descrição</Text>
                <Text style={styles.description}>{photoDescription}
                </Text>
              </View>
            </View>
          ) :
          (
            <View style={styles.container}>
              <View>
                <Text style={styles.label}>Data</Text>
                <Text style={styles.date}>{photoDate}</Text>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.label}>Descrição</Text>
                <TouchableOpacity style={styles.addDescriptionButton}>
                  <Text style={styles.buttonLabel}>Adicionar descrição</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
      } 
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },

  descriptionContainer: {
    marginTop: 16,
  },
  label: {
    color: colors.purple60,
    textAlign: 'left',
    fontSize: globalStyles.small,
    fontFamily: Ubuntu.regular,
  },
  date: {
    color: colors.purple200,
    fontSize: globalStyles.medium,
    marginTop: 8,
    fontFamily: Ubuntu.regular,
  },
  description: {
    color: colors.purple200,
    fontSize: globalStyles.medium,
    marginTop: 8,
    fontFamily: Ubuntu.regular,
  },
  addDescriptionButton: {
    backgroundColor: colors.purple80,
    padding: 8,
    borderRadius: 12,
    margin: 4,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonLabel: {
    color: colors.white,
    fontFamily: Ubuntu.regular,
    fontSize: globalStyles.medium
  }
});

