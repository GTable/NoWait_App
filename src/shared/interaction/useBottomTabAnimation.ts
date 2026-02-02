import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

/**
 * 바텀 탭 배경 인디케이터 애니메이션 훅
 *
 * - 선택된 탭에 따라 배경이 좌우로 이동
 * - Spring 애니메이션으로 자연스러운 효과
 *
 * @param currentTabIndex - 현재 선택된 탭의 인덱스 (0부터 시작)
 * @param tabWidth - 각 탭의 너비 (px)
 * @param tabGap - 탭 간 간격 (px)
 * @returns animatedStyle - Animated.View에 적용할 스타일
 */
export const useBottomTabAnimation = (
  currentTabIndex: number,
  tabWidth: number,
  tabGap: number,
) => {
  // 인디케이터의 X축 이동 거리
  const translateX = useSharedValue(0);

  // 탭 변경 시 애니메이션 트리거
  useEffect(() => {
    if (currentTabIndex !== -1) {
      translateX.value = withSpring(currentTabIndex * (tabWidth + tabGap), {
        damping: 20, // 감쇠 계수 (낮을수록 더 튕김)
        stiffness: 300, // 강성 (높을수록 빠르게 이동)
        mass: 0.5, // 질량 (낮을수록 가볍고 빠른 반응)
      });
    }
  }, [currentTabIndex, tabWidth, tabGap]);

  // 애니메이션 스타일 (transform translateX)
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return animatedStyle;
};
