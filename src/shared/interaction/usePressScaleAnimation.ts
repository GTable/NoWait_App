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

export const usePressScaleAnimation = ({
  scale: pressedScale = 0.96,
  opacity: pressedOpacity = 1,
  dimColor = "#0000001A",
  damping = 55,
  stiffness = 1000,
}: PressScaleAnimationOptions = {}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const dimOpacity = useSharedValue(0);

  const [isPressed, setIsPressed] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const dimAnimatedStyle = useAnimatedStyle(() => ({
    opacity: dimOpacity.value,
  }));

  const springConfig = { damping, stiffness };

  const handlePressIn = () => {
    setIsPressed(true);
    scale.value = withSpring(pressedScale, springConfig);
    opacity.value = withSpring(pressedOpacity, springConfig);
    dimOpacity.value = withSpring(1, springConfig);
  };

  const handlePressOut = () => {
    setIsPressed(false);
    scale.value = withSpring(1, springConfig);
    opacity.value = withSpring(1, springConfig);
    dimOpacity.value = withSpring(0, springConfig);
  };

  return {
    isPressed,
    dimStyle: { backgroundColor: dimColor },
    dimAnimatedStyle,
    animatedStyle,
    handlePressIn,
    handlePressOut,
  };
};
