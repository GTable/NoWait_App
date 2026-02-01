import React, { useMemo, useRef, useEffect } from "react";
import { Pressable } from "react-native";
import styled from "@emotion/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { SvgIcons } from "../assets/images";
import { colors } from "@/app/styles/colors";

type TabIconKey = keyof typeof SvgIcons;

const TAB_CONFIG: Record<string, { active: TabIconKey; inactive: TabIconKey }> =
  {
    Main: {
      active: "bottom-tab-home-active",
      inactive: "bottom-tab-home-inactive",
    },
    Search: {
      active: "bottom-tab-search-active",
      inactive: "bottom-tab-search-inactive",
    },
    Map: {
      active: "bottom-tab-map-active",
      inactive: "bottom-tab-map-inactive",
    },
    MyPage: {
      active: "bottom-tab-mypage-active",
      inactive: "bottom-tab-mypage-inactive",
    },
  };

const MAIN_TABS = new Set(["Main", "Map", "MyPage"]);

const BLUR_PROPS = { intensity: 40, tint: "light" } as const;
const GRADIENT_COLORS = ["#E8E8E800", "#E8E8E8CC"] as const;
const GRADIENT_DIRECTION = { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } };

// ✅ 상수(고정 레이아웃 기반)
const TAB_BTN_W = 62;
const TAB_BTN_H = 50;
const MAIN_GROUP_H = 60;
const MAIN_GROUP_PADDING_X = 6;
const MAIN_GROUP_GAP = 6;
const INDICATOR_TOP = (MAIN_GROUP_H - TAB_BTN_H) / 2;

// ✅ MovingIndicator (선택 배경 담당)
function MovingIndicator({ x }: { x: SharedValue<number> }) {
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
          top: INDICATOR_TOP,
          width: TAB_BTN_W,
          height: TAB_BTN_H,
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

// ✅ 메인 탭 버튼: 눌림 피드백은 "아이콘만 scale"
function MainTabButton({
  onPress,
  isFocused,
  Icon,
}: {
  onPress: () => void;
  isFocused: boolean;
  Icon: React.ComponentType<{ width: number; height: number }>;
}) {
  const scale = useSharedValue(1);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    // 살짝 작아졌다가
    scale.value = withTiming(0.92, { duration: 90 });
  };

  const onPressOut = () => {
    // 다시 원래로 복귀
    scale.value = withTiming(1, { duration: 120 });
  };

  return (
    <E.TabButton
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      // 접근성/터치 영역은 버튼이 담당
      accessibilityRole="button"
      accessibilityState={{ selected: isFocused }}
    >
      <Animated.View style={iconStyle}>
        <Icon width={24} height={24} />
      </Animated.View>
    </E.TabButton>
  );
}

export const CustomBottomTab = ({ state, navigation }: BottomTabBarProps) => {
  // ✅ 메인 탭 route들(순서 고정)
  const mainRoutes = useMemo(
    () => state.routes.filter((r) => MAIN_TABS.has(r.name)),
    [state.routes],
  );

  // ✅ 현재 포커스된 route가 메인 탭인지 확인
  const focusedRouteName = state.routes[state.index]?.name;
  const focusedMainIndex = mainRoutes.findIndex(
    (r) => r.name === focusedRouteName,
  );

  // Search 같은 비-메인 탭 포커스일 때, 마지막 메인 인덱스를 유지(원 위치 유지 UX)
  const lastMainIndexRef = useRef(0);
  useEffect(() => {
    if (focusedMainIndex >= 0) lastMainIndexRef.current = focusedMainIndex;
  }, [focusedMainIndex]);

  const effectiveMainIndex =
    focusedMainIndex >= 0 ? focusedMainIndex : lastMainIndexRef.current;

  // ✅ 인디케이터 X (메인 그룹 안에서만 이동)
  const indicatorX = useSharedValue(
    MAIN_GROUP_PADDING_X + effectiveMainIndex * (TAB_BTN_W + MAIN_GROUP_GAP),
  );

  // 탭 변경 시 인디케이터 이동
  useEffect(() => {
    const target =
      MAIN_GROUP_PADDING_X + effectiveMainIndex * (TAB_BTN_W + MAIN_GROUP_GAP);
    indicatorX.value = withTiming(target, { duration: 220 });
  }, [effectiveMainIndex]);

  const handlePress = (name: string, key: string, isFocused: boolean) => {
    // 검색 탭은 별도 스크린으로 이동
    if (name === "Search") {
      navigation.getParent()?.navigate("Search");
      return;
    }

    // ✅ 네비 state.index 업데이트 전에 인디케이터를 먼저 움직여 UX 즉시 반응
    const pressedMainIndex = mainRoutes.findIndex((r) => r.name === name);
    if (pressedMainIndex >= 0) {
      const target =
        MAIN_GROUP_PADDING_X + pressedMainIndex * (TAB_BTN_W + MAIN_GROUP_GAP);
      indicatorX.value = withTiming(target, { duration: 220 });
      lastMainIndexRef.current = pressedMainIndex;
    }

    const event = navigation.emit({
      type: "tabPress",
      target: key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) navigation.navigate(name);
  };

  const renderTab = (name: string, key: string, isFocused: boolean) => {
    const config = TAB_CONFIG[name];
    if (!config) return null;
    const Icon = SvgIcons[isFocused ? config.active : config.inactive];

    // 메인 탭은 아이콘만 scale 피드백
    if (MAIN_TABS.has(name)) {
      return (
        <MainTabButton
          key={key}
          isFocused={isFocused}
          Icon={Icon}
          onPress={() => handlePress(name, key, isFocused)}
        />
      );
    }

    // Search는 기존 렌더 유지(원형 그룹)
    return (
      <E.TabButton key={key} onPress={() => handlePress(name, key, isFocused)}>
        <Icon width={24} height={24} />
      </E.TabButton>
    );
  };

  return (
    <LinearGradient
      colors={GRADIENT_COLORS}
      style={containerStyle}
      {...GRADIENT_DIRECTION}
    >
      {/* 메인 탭 그룹 */}
      <E.MainTabGroup {...BLUR_PROPS}>
        {/* ✅ 선택 배경(원/필) 단 하나 */}
        <MovingIndicator x={indicatorX} />

        {mainRoutes.map((r) =>
          renderTab(
            r.name,
            r.key,
            r.name === mainRoutes[effectiveMainIndex]?.name,
          ),
        )}
      </E.MainTabGroup>

      {/* 검색 탭 (원형) */}
      {state.routes
        .filter((r) => r.name === "Search")
        .map((r) =>
          renderTab(r.name, r.key, state.index === state.routes.indexOf(r)),
        )}
    </LinearGradient>
  );
};

const containerStyle = {
  position: "absolute" as const,
  bottom: 0,
  left: 0,
  right: 0,
  flexDirection: "row" as const,
  justifyContent: "center" as const,
  alignItems: "flex-start" as const,
  paddingTop: 65,
  paddingHorizontal: 20,
  paddingBottom: 20,
  gap: 65,
};

const blurStyle = {
  alignItems: "center" as const,
  justifyContent: "center" as const,
  borderRadius: 999,
  borderWidth: 1,
  borderColor: colors.white[100],
  overflow: "hidden" as const,
};

const E = {
  MainTabGroup: styled(BlurView)({
    ...blurStyle,
    flexDirection: "row",
    height: MAIN_GROUP_H,
    paddingHorizontal: MAIN_GROUP_PADDING_X,
    paddingVertical: 20,
    gap: MAIN_GROUP_GAP,
    position: "relative",
    borderRadius: 999,
  }),

  SearchTabGroup: styled(BlurView)({
    ...blurStyle,
    width: 60,
    height: 60,
    padding: 5,
  }),

  // ✅ Pressable로 교체 (눌림 피드백은 아이콘만)
  TabButton: styled(Pressable)({
    width: TAB_BTN_W,
    height: TAB_BTN_H,
    paddingHorizontal: 19,
    paddingVertical: 13,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
  }),
};
