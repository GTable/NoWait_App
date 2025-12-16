// svg 파일을 react 컴포넌트로 사용하기 위한 타입 선언
declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
