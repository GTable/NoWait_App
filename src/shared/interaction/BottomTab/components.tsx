import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import styled from "@emotion/native";
import { Pressable } from "react-native";

/**
 * 바텀 탭 배경 인디케이터
 * - 선택된 탭 위치로 부드럽게 이동
 */
export function MovingIndicator({ x }: { x: SharedValue<number> }) {
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          left: 0,
          top: 5,
          width: 62,
          height: 50,
          borderRadius: 999,
          borderWidth: 0.5,
          borderColor: "#00000005",
          backgroundColor: "#B6B6B61A",
        },
        style,
      ]}
    />
  );
}

/**
 * 메인 탭 버튼 (아이콘 scale 피드백)
 * - 버튼을 누르면 아이콘이 살짝 작아졌다가 복귀
 */
export function MainTabButton({
  onPress,
  isFocused,
  Icon,
  width = 62,
  height = 50,
}: {
  onPress: () => void;
  isFocused: boolean;
  Icon: React.ComponentType<{ width: number; height: number }>;
  width?: number;
  height?: number;
}) {
  const scale = useSharedValue(1);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withTiming(0.92, { duration: 90 });
  };

  const onPressOut = () => {
    scale.value = withTiming(1, { duration: 120 });
  };

  return (
    <TabButton
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityState={{ selected: isFocused }}
      style={{ width, height }}
    >
      <Animated.View style={iconStyle}>
        <Icon width={24} height={24} />
      </Animated.View>
    </TabButton>
  );
}

const TabButton = styled(Pressable)({
  paddingHorizontal: 19,
  paddingVertical: 13,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 999,
});
