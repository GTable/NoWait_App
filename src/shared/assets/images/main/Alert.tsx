import React from "react";
import Svg, { Path } from "react-native-svg";

interface AlertProps {
  width?: number;
  height?: number;
}

export const Alert: React.FC<AlertProps> = ({ width = 24, height = 24 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.4964 18.0288C15.4964 19.9613 13.9298 21.5279 11.9973 21.5279C10.0649 21.5279 8.49829 19.9613 8.49829 18.0288"
        stroke="#222222"
        strokeWidth="2"
      />
      <Path
        d="M11.9971 2C16.0826 2 19.3944 5.31193 19.3945 9.39746V12.7754C19.3871 14.4491 20.3448 15.4522 21.3154 16.4844C21.43 16.6063 21.4941 16.7679 21.4941 16.9375C21.4941 17.3098 21.1926 17.6121 20.8203 17.6123H3.17773C2.80358 17.6123 2.50019 17.3087 2.5 16.9346C2.5 16.7648 2.56401 16.604 2.67676 16.4834C3.57555 15.5228 4.48889 14.5774 4.58984 13.0801L4.59961 12.7734V9.39746C4.59975 5.31196 7.91155 2.00005 11.9971 2Z"
        stroke="#222222"
        strokeWidth="2"
      />
    </Svg>
  );
};
