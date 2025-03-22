import { View, Text, TextInput, StyleSheet } from "react-native";
import { InputFieldProps } from "../interfaces/InputFieldProps";

export const InputField: React.FC<InputFieldProps> = ({ label, value, onChangeText, secureTextEntry, keyboardType, autoCapitalize, editable, onPressIn }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.inputValue}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#C9C6D7"
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      editable={editable}
      onPressIn={onPressIn}

      
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    height: 56,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#C9C6D7",
    borderRadius: 10,
    gap: 8,
  },
  inputLabel: {
    color: "#C9C6D7",
    fontFamily: "Ubuntu",
    fontSize: 10,
    fontWeight: "400",
  },
  inputValue: {
    color: "#4A4063",
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: "400",
  },
})