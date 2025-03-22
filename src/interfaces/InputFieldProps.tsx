import { KeyboardTypeOptions } from "react-native";

export interface InputFieldProps {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  editable?: boolean;
  onPressIn?: () => void;
}