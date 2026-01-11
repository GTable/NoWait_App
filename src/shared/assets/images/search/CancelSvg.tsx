import React from "react";
import Svg, { Rect, SvgProps } from "react-native-svg";

type CancelSvgProps = SvgProps & {
  color?: string;
};

export const CancelSvg = ({
  width = 16,
  height = 16,
  color = "#888888",
  ...props
}: CancelSvgProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Rect
        x={12.2429}
        y={13.1855}
        width={13.3333}
        height={1.33333}
        rx={0.666667}
        transform="rotate(-135 12.2429 13.1855)"
        fill={color}
      />
      <Rect
        x={2.81445}
        y={12.2429}
        width={13.3333}
        height={1.33333}
        rx={0.666667}
        transform="rotate(-45 2.81445 12.2429)"
        fill={color}
      />
    </Svg>
  );
};
