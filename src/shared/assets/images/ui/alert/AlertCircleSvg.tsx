import React from "react";
import Svg, { Path } from "react-native-svg";

interface AlertCircleSvgProps {
  size?: number;
  fillColor?: string;
  fillOpacity?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

export const AlertCircleSvg = ({
  size = 22,
  fillColor = "white",
  fillOpacity = 0.25,
  strokeColor = "#F4F4F4",
  strokeWidth = 1.83333,
}: AlertCircleSvgProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path
        d="M11.0002 20.1667C16.0628 20.1667 20.1668 16.0627 20.1668 11C20.1668 5.93743 16.0628 1.83337 11.0002 1.83337C5.93755 1.83337 1.8335 5.93743 1.8335 11C1.8335 16.0627 5.93755 20.1667 11.0002 20.1667Z"
        fill={fillColor}
        fillOpacity={fillOpacity}
      />
      <Path
        d="M11 7.33337V11.55"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 14.6666H11.0071"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
