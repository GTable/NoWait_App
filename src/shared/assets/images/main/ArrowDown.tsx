import React from "react";
import Svg, { Rect, Mask, G, Path } from "react-native-svg";

interface ArrowDownProps {
  width?: number;
  height?: number;
}

export const ArrowDown = ({ width = 24, height = 24 }: ArrowDownProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Rect width="24" height="24" rx="12" fill="#F7F7F7" />
      <Mask
        id="mask0"
        maskUnits="userSpaceOnUse"
        x="2"
        y="2"
        width="20"
        height="21"
      >
        <Rect x="2" y="2.5" width="20" height="20" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0)">
        <Path
          d="M11.9948 15.2493C11.8948 15.2493 11.8011 15.232 11.7136 15.1973C11.6261 15.1625 11.5476 15.1105 11.4782 15.041L7.52693 11.0898C7.36943 10.9323 7.29415 10.7528 7.3011 10.5514C7.30804 10.35 7.3879 10.173 7.54068 10.0202C7.69346 9.8674 7.87054 9.79102 8.07193 9.79102C8.27332 9.79102 8.4504 9.8674 8.60318 10.0202L11.999 13.4368L15.4157 10.0202C15.5685 9.8674 15.7455 9.79449 15.9469 9.80143C16.1483 9.80838 16.3254 9.88824 16.4782 10.041C16.631 10.1938 16.7073 10.3709 16.7073 10.5723C16.7073 10.7737 16.6286 10.9527 16.4711 11.1093L12.5198 15.041C12.4448 15.1105 12.3636 15.1625 12.2761 15.1973C12.1886 15.232 12.0948 15.2493 11.9948 15.2493Z"
          fill="#888888"
        />
      </G>
    </Svg>
  );
};
