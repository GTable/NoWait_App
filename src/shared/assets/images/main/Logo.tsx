import React from "react";
import Svg, { Path, Rect, G } from "react-native-svg";

interface LogoProps {
  width?: number;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({ width = 58, height = 24 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 58 24" fill="none">
      <Path
        d="M23.249 1C27.3362 1.0001 28.0723 4.09703 28.0723 7.91699C28.0722 11.7368 27.0091 14.8339 23.249 14.834C19.4888 14.834 18.4258 11.7369 18.4258 7.91699C18.4258 4.09697 19.5704 1 23.249 1ZM23.917 4.41895C22.4597 4.18544 21.9136 5.71281 21.5391 7.64453C21.1645 9.5762 21.2653 11.2071 22.5605 11.415C23.8561 11.6228 24.5649 10.1213 24.9395 8.18945C25.3139 6.25774 25.172 4.6202 23.917 4.41895Z"
        fill="#FF4103"
      />
      <Path
        d="M46.1299 1C50.3389 1 51.7012 4.09697 51.7012 7.91699C51.7011 11.7369 50.6277 14.834 46.1299 14.834C41.6325 14.8338 40.5596 11.7368 40.5596 7.91699C40.5596 4.09711 41.6736 1.00023 46.1299 1ZM46.8584 4.41895C45.4011 4.18544 44.855 5.71281 44.4805 7.64453C44.106 9.5762 44.2067 11.2071 45.502 11.415C46.7975 11.6228 47.5063 10.1213 47.8809 8.18945C48.2553 6.25774 48.1134 4.6202 46.8584 4.41895Z"
        fill="#FF4103"
      />
      <Rect
        x="2.05593"
        y="1.15553"
        width="3.57616"
        height="14.1196"
        fill="#FF4103"
        stroke="#FF4103"
        strokeWidth="0.162631"
      />
      <Rect
        x="7.44167"
        y="12.5227"
        width="3.57616"
        height="11.2033"
        fill="#FF4103"
        stroke="#FF4103"
        strokeWidth="0.162631"
      />
      <Rect
        x="21.5696"
        y="15.8137"
        width="3.57616"
        height="7.91316"
        fill="#FF4103"
        stroke="#FF4103"
        strokeWidth="0.162631"
      />
      <Path
        d="M28.1774 19.0156L18.7311 19.0156L18.7311 15.8135L28.1774 15.8135L28.1774 19.0156Z"
        fill="#FF4103"
        stroke="#FF4103"
        strokeWidth="0.162631"
      />
      <Rect
        x="32.4021"
        y="20.5227"
        width="3.20228"
        height="5.22123"
        transform="rotate(90 32.4021 20.5227)"
        fill="#FF4103"
        stroke="#FF4103"
        strokeWidth="0.162631"
      />
      <Rect
        x="56.8513"
        y="20.5227"
        width="3.20228"
        height="7.68883"
        transform="rotate(90 56.8513 20.5227)"
        fill="#FF4103"
        stroke="#FF4103"
        strokeWidth="0.162631"
      />
      <Rect
        x="51.3191"
        y="20.5867"
        width="3.57616"
        height="4.6978"
        transform="rotate(180 51.3191 20.5867)"
        fill="#FF4103"
        stroke="#FF4103"
        strokeWidth="0.162631"
      />
      <Rect
        x="53.1292"
        y="1.15553"
        width="3.57616"
        height="16.5872"
        fill="#FF4103"
        stroke="#FF4103"
        strokeWidth="0.162631"
      />
      <Rect
        x="29.7971"
        y="1.15553"
        width="3.57616"
        height="22.5692"
        fill="#FF4103"
        stroke="#FF4103"
        strokeWidth="0.162631"
      />
      <Rect
        x="17.2956"
        y="20.5227"
        width="3.20228"
        height="15.7646"
        transform="rotate(90 17.2956 20.5227)"
        fill="#FF4103"
        stroke="#FF4103"
        strokeWidth="0.162631"
      />
      <Rect
        x="16.7732"
        y="12.3723"
        width="3.27706"
        height="14.7178"
        transform="rotate(90 16.7732 12.3723)"
        fill="#FF4103"
        stroke="#FF4103"
        strokeWidth="0.162631"
      />
      <Rect
        x="34.6575"
        y="1.15553"
        width="3.57616"
        height="22.5692"
        fill="#FF4103"
        stroke="#FF4103"
        strokeWidth="0.162631"
      />
      <Path
        d="M51.2461 21.4775L40.416 23.708V20.1553L51.2461 17.9258V21.4775Z"
        fill="#FF4103"
        stroke="#FF4103"
        strokeWidth="0.162631"
      />
    </Svg>
  );
};
