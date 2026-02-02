/**
 * 커스텀 하단 탭 바 컴포넌트
 * - 메인 탭 그룹 (홈, 지도, 마이페이지)과 검색 탭 그룹으로 분리
 * - LinearGradient 배경과 BlurView 효과 적용
 * - 선택된 탭에 따라 배경 인디케이터 애니메이션 이동
 */

import React from "react";
import { Pressable } from "react-native";
import styled from "@emotion/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { SvgIcons } from "../assets/images";
import { colors } from "@/app/styles/colors";
import { useBottomTabAnimation } from "../interaction/BottomTab/useBottomTabAnimation";
import {
  MovingIndicator,
  MainTabButton,
} from "../interaction/BottomTab/components";

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

export const CustomBottomTab = ({ state, navigation }: BottomTabBarProps) => {
  // 애니메이션 훅으로 인디케이터 관리
  const { indicatorX, mainRoutes, moveIndicatorTo } = useBottomTabAnimation(
    state.routes,
    state.index,
    MAIN_TABS,
    TAB_BTN_W,
    MAIN_GROUP_GAP,
    MAIN_GROUP_PADDING_X,
  );

  const handlePress = (name: string, key: string, isFocused: boolean) => {
    // 검색 탭은 별도 스크린으로 이동
    if (name === "Search") {
      navigation.getParent()?.navigate("Search");
      return;
    }

    // 메인 탭 클릭 시 인디케이터 즉시 이동 (UX 향상)
    moveIndicatorTo(name);

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

        {mainRoutes.map((r) => {
          const isFocused = r.name === state.routes[state.index]?.name;
          return renderTab(r.name, r.key, isFocused);
        })}
      </E.MainTabGroup>

      {/* 검색 탭 (원형) */}
      {state.routes.map((route) => {
        if (route.name !== "Search") return null;
        const isFocused = state.routes[state.index]?.name === "Search";
        return (
          <E.SearchTabGroup key={route.key} {...BLUR_PROPS}>
            {renderTab(route.name, route.key, isFocused)}
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
    flexDirection: "row",
    height: MAIN_GROUP_H,
    paddingHorizontal: MAIN_GROUP_PADDING_X,
    paddingVertical: 20,
    gap: MAIN_GROUP_GAP,
    // ✅ absolute indicator가 보이도록
    position: "relative",
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
