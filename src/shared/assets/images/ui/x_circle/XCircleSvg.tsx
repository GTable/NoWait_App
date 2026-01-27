import React from "react";
import Svg, { Path } from "react-native-svg";

interface XCircleSvgProps {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export const XCircleSvg = ({
  size = 24,
  fillColor = "#AAAAAA",
  strokeColor = "#F4F4F4",
  strokeWidth = 2,
}: XCircleSvgProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        fill={fillColor}
      />
      <Path
        d="M15 9L9 15"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 9L15 15"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
