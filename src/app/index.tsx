import colors from "@/src/constants/colors";
import { View, Text, StyleSheet, TextInput, Pressable, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {

  return(

    <SafeAreaView style={styles.container}>
      <ActivityIndicator size={44} color={colors.purple92} />
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 34,
    backgroundColor: colors.purple60,
    justifyContent: 'center',
    alignItems: 'center'
  },
})