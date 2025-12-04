import "@emotion/react";
import type { colors } from "./colors";
import type { typography } from "./typography";

type Colors = typeof colors;
type Typography = typeof typography;

declare module "@emotion/react" {
  export interface Theme {
    colors: Colors;
    typography: Typography;
  }
}
