import React from "react";
import Svg, { Path } from "react-native-svg";

interface ArrowRightSvgProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const ArrowRightSvg = ({
  size = 24,
  color = "#AAAAAA",
  strokeWidth = 2,
}: ArrowRightSvgProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 18L18 12L12 6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
