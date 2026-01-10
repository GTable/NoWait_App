import React from "react";
import Svg, { Path } from "react-native-svg";

interface CheckIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const CheckSvg = ({
  size = 15,
  color = "white",
  strokeWidth = 1.83333,
}: CheckIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 15 15" fill="none">
      <Path
        d="M12.2221 3.66724L5.49989 10.3895L2.44434 7.3339"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
