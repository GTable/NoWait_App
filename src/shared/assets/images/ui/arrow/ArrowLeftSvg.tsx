import React from "react";
import Svg, { Path } from "react-native-svg";

interface ArrowLeftSvgProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const ArrowLeftSvg = ({
  size = 28,
  color = "#000000",
  strokeWidth = 2,
}: ArrowLeftSvgProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <Path
        d="M17.5 21L10.5 14L17.5 7"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
