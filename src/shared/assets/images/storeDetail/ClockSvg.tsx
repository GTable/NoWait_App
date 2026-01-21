import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type ClockSvgProps = SvgProps & {
  color?: string;
  strokeColor?: string;
};

export const ClockSvg = ({
  width = 18,
  height = 18,
  color = "#CCCCCC",
  strokeColor = "white",
  ...props
}: ClockSvgProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <Path
        d="M9 16.5002C13.1421 16.5002 16.5 13.1424 16.5 9.00024C16.5 4.85811 13.1421 1.50024 9 1.50024C4.85786 1.50024 1.5 4.85811 1.5 9.00024C1.5 13.1424 4.85786 16.5002 9 16.5002Z"
        fill={color}
      />
      <Path
        d="M9 4.5V9L12 10.5"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
