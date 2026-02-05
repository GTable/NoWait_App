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
  const mainRoutes = useMemo(
    () => routes.filter((r) => mainTabNames.has(r.name)),
    [routes, mainTabNames],
  );

  const focusedRouteName = routes[currentIndex]?.name;
  const focusedMainIndex = mainRoutes.findIndex(
    (r) => r.name === focusedRouteName,
  );

  const lastMainIndexRef = useRef(0);
  const currentMainIndex =
    focusedMainIndex >= 0 ? focusedMainIndex : lastMainIndexRef.current;

  const indicatorXRef = useRef(useSharedValue(paddingX));
  const indicatorX = indicatorXRef.current;

  useEffect(() => {
    if (focusedMainIndex >= 0) {
      lastMainIndexRef.current = focusedMainIndex;
    }
    const targetX = paddingX + currentMainIndex * (tabWidth + tabGap);
    indicatorX.value = withSpring(targetX, {
      damping: 25,
      stiffness: 350,
      mass: 0.6,
    });
  }, [currentMainIndex, paddingX, tabGap, tabWidth, indicatorX]);

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
