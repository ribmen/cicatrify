import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform,
  Alert, 
  Pressable
} from "react-native";


import { supabase } from "@/src/lib/supabase";
import { router } from "expo-router";
import { Ubuntu } from "@/src/constants/fonts";
import { InputField } from "@/src/components/InputField";
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from "@/src/constants/colors";


export default function NovoPacienteCard() {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  async function getUserId() {
    const { data: { user } } = await supabase.auth.getUser();

    console.log(user?.id);
    return user?.id;
  }

  async function handleNewPatient() {
    setLoading(true);

    try {
      const { data, error } = await supabase
      .from('patients')
      .insert({ 
        name: name,
        birthdate: formatDateSupabase(birthdate),
        nurse_id: await getUserId()
      })

    if (data) {
      console.log(data);
    }

    if (error) {
      Alert.alert('Error, ', error.code)
      setLoading(false);
    }
    
    setLoading(false);
    router.replace("/(panel)/profile/PacientesScreen/page");
    } catch (error) {
      setLoading(false);
      console.log(error);
      router.replace("/(panel)/profile/PacientesScreen/page");
    }
    
  }

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  }

  const onChangeDatePicker = ({ type }: any, selectedDate: any) => {
    if ( type == 'set' ) {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === 'android') {
        toggleDatePicker();
        setBirthdate(formatFieldDate(currentDate));
      }
    } else {
      toggleDatePicker();
    }
  }

  const confirmIOSDate = () => {
    setBirthdate(formatFieldDate(date));
    toggleDatePicker();
  }

  const formatFieldDate = (rawDate: Date) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const formatDateSupabase = (birthdate: string) => {
    const day = birthdate.slice(0, 2);
    const month = birthdate.slice(3, 5);
    const year = birthdate.slice(6, (birthdate.length));

    birthdate = (month + '-' + day + '-' + year);
    return birthdate;
  }


  return (
    <View style={styles.cardContainer}>

      <InputField label="Nome completo" value={name} onChangeText={setName} />

      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChangeDatePicker}
          style={styles.datePicker}
          maximumDate={new Date('2025-1-1')}
        />
      )}

      {showPicker && Platform.OS === 'ios' &&(
        <View style={{ flexDirection: "row", justifyContent: 'space-around'}} >
          <TouchableOpacity onPress={toggleDatePicker} >
            <Text>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={confirmIOSDate}>
          <Text >Confirmar </Text>
          </TouchableOpacity>
        </View>
      )}

      <Pressable onPress={toggleDatePicker}>
        <InputField
          label="Data de nascimento"
          value={birthdate}
          onChangeText={setBirthdate}
          editable={false}
          onPressIn={toggleDatePicker}
        />
      </Pressable>

      <TouchableOpacity 
        style={[styles.cadastroButton]} 
        onPress={handleNewPatient} 
        disabled={loading}
      >
        <Text style={styles.cadastroButtonText}>
          {loading ? "Carregando..." : "Cadastrar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    position: "absolute",
    top: 84,
    left: 48,
    width: 300
  },
  welcomeText: {
    fontFamily: Ubuntu.regular,
    fontSize: 26,
    fontWeight: "700",
    color: "#F1F1F1",
  },
  cicatrifyText: {
    fontFamily: Ubuntu.bold,
    fontSize: 26,
    fontWeight: "700",
    color: "#F1F1F1",
  },
  iosButton: {
    padding: 10,
    borderRadius: 10
  },
  cancelButton: {
    backgroundColor: colors.purple60
  },
  cardContainer: {
    display: 'flex',
    top: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 345,
    padding: 24,
    borderRadius: 14,
    backgroundColor: "#F1F1F1",
    boxShadow: '0px 2px 16px 0px rgba(191, 172, 200, 0.30)',
    gap: 24,
  },
  headerContainer: {
    gap: 8,
  },
  headerTitle: {
    color: "#2C263C",
    fontFamily: "Ubuntu",
    fontSize: 26,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "#4A4063",
    fontFamily: Ubuntu.regular,
    fontSize: 14,
    fontWeight: "400",
  },
  cicatrifySubtitle: {
    color: "#4A4063",
    fontFamily: Ubuntu.bold,
    fontSize: 14,
    fontWeight: "400",
  },
  
  cadastroButton: {
    height: 56,
    borderRadius: 10,
    backgroundColor: "#783F8E",
    justifyContent: "center",
    alignItems: "center",
  },
  cadastroButtonText: {
    color: "#FFF",
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: "700",
  },
  signupContainer: {
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  dividerText: {
    color: "#C9C6D7",
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: "400",
  },
  signupButton: {
    height: 56,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  signupButtonText: {
    color: "#783F8E",
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: "500",
  },
  datePicker: {
    height: 120,
    marginTop: -10,
    backgroundColor: '#979797'
  }
});


