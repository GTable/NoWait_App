import { useState } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type PressScaleAnimationOptions = {
  scale?: number;
  opacity?: number;
  dimColor?: string;
  damping?: number;
  stiffness?: number;
};

export const usePressScaleAnimation = (
  {
    scale: pressedScale = 0.96,
    opacity: pressedOpacity = 1,
    dimColor = "rgba(0, 0, 0, 0.1)",
    damping = 55,
    stiffness = 1000,
  }: PressScaleAnimationOptions = {},
) => {
  // Scale 애니메이션 값 (1 = 100%)
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const dimOpacity = useSharedValue(0);

  // Press 상태 (dim 효과 표시용)
  const [isPressed, setIsPressed] = useState(false);

  // Scale 애니메이션 스타일
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const dimAnimatedStyle = useAnimatedStyle(() => ({
    opacity: dimOpacity.value,
  }));

  const springConfig = { damping, stiffness };

  // Press In: scale/opacity 변경 + dim 표시
  const handlePressIn = () => {
    setIsPressed(true);
    scale.value = withSpring(pressedScale, springConfig);
    opacity.value = withSpring(pressedOpacity, springConfig);
    dimOpacity.value = withSpring(1, springConfig);
  };

  // Press Out: scale/opacity 복원 + dim 제거
  const handlePressOut = () => {
    setIsPressed(false);
    scale.value = withSpring(1, springConfig);
    opacity.value = withSpring(1, springConfig);
    dimOpacity.value = withSpring(0, springConfig);
  };

  return {
    isPressed, // dim 효과 표시 여부
    dimStyle: { backgroundColor: dimColor },
    dimAnimatedStyle,
    animatedStyle, // scale/opacity 애니메이션 스타일
    handlePressIn, // Pressable onPressIn
    handlePressOut, // Pressable onPressOut
  };
};
