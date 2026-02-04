import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { colors } from "@/app/styles/colors";

interface CustomSpinnerProps {
  /** 스피너 크기 (기본값: 28) */
  size?: number;
  /** 스피너 색상 (기본값: black[100]) */
  color?: string;
}

export const CustomSpinner = ({
  size = 28,
  color = colors.black[100],
}: CustomSpinnerProps) => {
  const rotation = useSharedValue(0);

  // 1초에 360도 무한 회전 애니메이션
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
    );
  }, []);

  const spinnerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 3,
          borderColor: colors.black[30],
          borderTopColor: color,
        },
        spinnerStyle,
      ]}
    />
  );
};
