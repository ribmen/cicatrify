import * as React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { LandPlotIcon } from "./LandPlotIcon";
import Svg, { Path, Circle } from "react-native-svg";

interface Icon {
  icon: string;
}


interface UserAvatarIconProps {
  color?: string;
  width?: number;
  height?: number;
}

export const UserAvatarIcon: React.FC<UserAvatarIconProps> = ({
  color = "#BFACC8",
  width = 32,
  height = 32,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      {/* Cabeça */}
      <Circle
        cx="12"
        cy="8"
        r="4"
        stroke={color}
        strokeWidth="2"
      />
      {/* Ombros */}
      <Path
        d="M4 20c0-4 4-6 8-6s8 2 8 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};


const PatientInfoCardPin: React.FC<Icon> = ({icon}) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View style={styles.container}>
        {icon === "user" ?
        <UserAvatarIcon /> : 
        <LandPlotIcon />
        }
        
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: 56,
    height: 56,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#B09BBA",
  },
  iconContainer: {
    width: 24,
    height: 24,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16
  },
  head: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "transparent",
    borderWidth: 2.2,
    borderColor: "#BFACC8",
    position: "absolute",
    top: 2,
    alignSelf: "center",
  },
  body: {
    width: 16,
    height: 8,
    borderTopWidth: 2.2,
    borderLeftWidth: 2.2,
    borderRightWidth: 2.2,
    borderColor: "#BFACC8",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: "absolute",
    bottom: 2,
    alignSelf: "center",
  },
});

export default PatientInfoCardPin;
