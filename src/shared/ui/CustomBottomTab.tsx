/**
 * 커스텀 하단 탭 바 컴포넌트
 * - 메인 탭 그룹 (홈, 지도, 마이페이지)과 검색 탭 그룹으로 분리
 * - LinearGradient 배경과 BlurView 효과 적용
 * - 선택된 탭에 따라 배경 인디케이터 애니메이션 이동
 */

import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "@emotion/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";
import { SvgIcons } from "../assets/images";
import { colors } from "@/app/styles/colors";
import { useBottomTabAnimation } from "../interaction/useBottomTabAnimation";

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

/** 메인 탭 목록 */
const MAIN_TAB_ORDER = ["Main", "Map", "MyPage"];

/** 탭 레이아웃 상수 */
const TAB_WIDTH = 62;
const TAB_GAP = 6;

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
  // 현재 선택된 메인 탭의 인덱스 찾기
  const currentMainTabIndex = MAIN_TAB_ORDER.findIndex(
    (tabName) => state.routes[state.index]?.name === tabName,
  );

  // 배경 인디케이터 애니메이션 스타일
  const animatedIndicatorStyle = useBottomTabAnimation(
    currentMainTabIndex,
    TAB_WIDTH,
    TAB_GAP,
  );

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
        {/* 애니메이션 배경 인디케이터 */}
        <E.AnimatedIndicator style={animatedIndicatorStyle} />

        {/* 탭 버튼들 */}
        {state.routes
          .filter((r) => MAIN_TAB_ORDER.includes(r.name))
          .map((r) => {
            const isFocused = state.index === state.routes.indexOf(r);
            return renderTab(r.name, r.key, isFocused);
          })}
      </E.MainTabGroup>

      {/* 검색 탭 (원형) */}
      {state.routes
        .filter((r) => r.name === "Search")
        .map((r) => {
          const isFocused = state.index === state.routes.indexOf(r);
          return (
            <E.SearchTabGroup key={r.key} {...BLUR_PROPS}>
              {renderTab(r.name, r.key, isFocused)}
            </E.SearchTabGroup>
          );
        })}
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
    position: "relative",
    flexDirection: "row",
    height: MAIN_GROUP_H,
    paddingHorizontal: MAIN_GROUP_PADDING_X,
    paddingVertical: 20,
    gap: MAIN_GROUP_GAP,
    position: "relative",
    borderRadius: 999,
  }),

  /** 애니메이션 배경 인디케이터 */
  AnimatedIndicator: styled(Animated.View)({
    position: "absolute",
    top: 5,
    left: 6,
    width: TAB_WIDTH,
    height: 50,
    borderRadius: 999,
    borderWidth: 0.5,
    borderColor: "#00000005",
    backgroundColor: "#B6B6B61A",
  }),

  /** 검색 탭 그룹 (원형) */
  SearchTabGroup: styled(BlurView)({
    ...blurStyle,
    width: 60,
    height: 60,
    padding: 5,
  }),

  /** 탭 버튼 */
  TabButton: styled(TouchableOpacity)({
    width: TAB_WIDTH,
    height: 50,
    paddingHorizontal: 19,
    paddingVertical: 13,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
  }),
};
