import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface PlusIconProps {
  color?: string;
  size?: number;
}

export const PlusIcon: React.FC<PlusIconProps> = ({
  color = "#EBEBEB",
  size = 26,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <Path
        d="M5.41669 13H20.5834M13 5.41663V20.5833"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
