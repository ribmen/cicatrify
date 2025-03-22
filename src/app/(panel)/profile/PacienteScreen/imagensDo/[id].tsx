import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

export default function imagesOfPatient () {

  const { id } = useLocalSearchParams();
  

  return (
    <SafeAreaView>
      <Text>Tela de imagens</Text>
    </SafeAreaView>
  )
}