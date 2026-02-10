import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import styled from "@emotion/native";

const STROKE_COLORS = [
  "rgba(103, 103, 103, 0.12)",
  "rgba(255, 255, 255, 0.12)",
  "rgba(103, 103, 103, 0.12)",
] as const;

interface GlassCardProps {
  children: ReactNode;
}

export const GlassCard = ({ children }: GlassCardProps) => {
  return (
    <E.StrokeContainer
      colors={[...STROKE_COLORS]}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <E.WrapContainer>
        <E.ShadowLayer pointerEvents="none" />
        <E.BlurLayer intensity={10} tint="light" pointerEvents="none" />
        {children}
      </E.WrapContainer>
    </E.StrokeContainer>
  );
};

const E = {
  StrokeContainer: styled(LinearGradient)({
    width: "100%",
    padding: 0.5,
    borderRadius: 26,
    position: "relative",
  }),

  WrapContainer: styled.View({
    width: "100%",
    padding: 4,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    borderRadius: 25.5,
    backgroundColor: "rgba(255, 255, 255, 0.60)",
  }),

  ShadowLayer: styled.View({
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 26,
    backgroundColor: "rgba(255, 255, 255, 0.60)",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.03,
    shadowRadius: 30,
    elevation: 6,
  }),

  BlurLayer: styled(BlurView)({
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 26,
    backgroundColor: "rgba(255, 255, 255, 0.60)",
  }),
};
