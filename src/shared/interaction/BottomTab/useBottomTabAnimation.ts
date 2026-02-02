import { useEffect, useRef, useMemo } from "react";
import {
  useSharedValue,
  withSpring,
  type SharedValue,
} from "react-native-reanimated";

interface Route {
  name: string;
  key: string;
}

/**
 * 바텀 탭 배경 인디케이터 애니메이션 훅
 *
 * - 선택된 탭에 따라 배경이 좌우로 이동
 * - 탭 클릭 시 즉시 반응하여 UX 향상
 * - Search 같은 비-메인 탭 포커스 시 마지막 메인 탭 위치 유지
 *
 * @param routes - 전체 라우트 목록
 * @param currentIndex - 현재 선택된 라우트 인덱스
 * @param mainTabNames - 메인 탭 이름 Set
 * @param tabWidth - 각 탭의 너비 (px)
 * @param tabGap - 탭 간 간격 (px)
 * @param paddingX - 그룹 좌우 패딩 (px)
 * @returns { indicatorX, effectiveMainIndex, moveIndicatorTo }
 */
export const useBottomTabAnimation = (
  routes: Route[],
  currentIndex: number,
  mainTabNames: Set<string>,
  tabWidth: number,
  tabGap: number,
  paddingX: number,
) => {
  // 메인 탭 route들만 필터링 (순서 고정)
  const mainRoutes = useMemo(
    () => routes.filter((r) => mainTabNames.has(r.name)),
    [routes, mainTabNames],
  );

  // 현재 포커스된 route가 메인 탭인지 확인
  const focusedRouteName = routes[currentIndex]?.name;
  const focusedMainIndex = mainRoutes.findIndex(
    (r) => r.name === focusedRouteName,
  );

  // Search 같은 비-메인 탭 포커스일 때, 마지막 메인 인덱스를 유지
  const lastMainIndexRef = useRef(0);
  const currentMainIndex =
    focusedMainIndex >= 0 ? focusedMainIndex : lastMainIndexRef.current;

  // 인디케이터 X (메인 그룹 안에서만 이동)
  const indicatorXRef = useRef(useSharedValue(paddingX));
  const indicatorX = indicatorXRef.current;

  // 탭 변경 시 인디케이터 이동 (약간의 spring 효과)
  useEffect(() => {
    if (focusedMainIndex >= 0) {
      lastMainIndexRef.current = focusedMainIndex;
    }
    const targetX = paddingX + currentMainIndex * (tabWidth + tabGap);
    indicatorX.value = withSpring(targetX, {
      damping: 25, // 높은 감쇠로 튕김 최소화
      stiffness: 350, // 빠르고 부드러운 이동
      mass: 0.6, // 가벼운 느낌
    });
  }, [currentMainIndex, paddingX, tabGap, tabWidth, indicatorX]);

  // 탭 클릭 시 즉시 인디케이터 이동 (UX 즉시 반응)
  const moveIndicatorTo = (routeName: string) => {
    const pressedMainIndex = mainRoutes.findIndex((r) => r.name === routeName);
    if (pressedMainIndex >= 0) {
      const targetX = paddingX + pressedMainIndex * (tabWidth + tabGap);
      indicatorX.value = withSpring(targetX, {
        damping: 25,
        stiffness: 350,
        mass: 0.6,
      });
      lastMainIndexRef.current = pressedMainIndex;
    }
  };

  return {
    indicatorX,
    mainRoutes,
    moveIndicatorTo,
  };
};
