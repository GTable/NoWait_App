import React from "react";
import { Pressable } from "react-native";
import styled from "@emotion/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { SvgIcons } from "../assets/images";
import { colors } from "@/app/styles/colors";
import { useBottomTabAnimation } from "../interaction/bottom_tab/useBottomTabAnimation";
import {
  MovingIndicator,
  MainTabButton,
} from "../interaction/bottom_tab/components";

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

const TAB_BTN_W = 62;
const MAIN_GROUP_PADDING_X = 6;
const MAIN_GROUP_GAP = 6;

/**
 * 커스텀 하단 탭 바 — 메인 탭 그룹과 검색 탭을 분리하여 렌더링
 * @param state - 탭 네비게이터 상태
 * @param navigation - 탭 네비게이터 네비게이션 객체
 */
export const CustomBottomTab = ({ state, navigation }: BottomTabBarProps) => {
  const { indicatorX, mainRoutes, moveIndicatorTo } = useBottomTabAnimation(
    state.routes,
    state.index,
    MAIN_TABS,
    TAB_BTN_W,
    MAIN_GROUP_GAP,
    MAIN_GROUP_PADDING_X,
  );

  const handlePress = (name: string, key: string, isFocused: boolean) => {
    if (name === "Search") {
      navigation.getParent()?.navigate("Search");
      return;
    }

    const event = navigation.emit({
      type: "tabPress",
      target: key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      moveIndicatorTo(name);
      if (!isFocused) {
        navigation.navigate(name);
      }
    }
  };

  const renderTab = (name: string, key: string, isFocused: boolean) => {
    const config = TAB_CONFIG[name];
    if (!config) return null;
    const Icon = SvgIcons[isFocused ? config.active : config.inactive];

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
  justifyContent: "space-between" as const,
  alignItems: "flex-start" as const,
  paddingTop: 65,
  paddingHorizontal: 18,
  paddingBottom: 20,
  zIndex: 1,
};

const blurStyle = {
  alignItems: "center" as const,
  justifyContent: "center" as const,
  borderRadius: 999,
  borderWidth: 1,
  borderColor: colors.white[100],
  overflow: "hidden" as const,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
};

const E = {
  MainTabGroup: styled(BlurView)({
    ...blurStyle,
    flexDirection: "row",
    padding: 5,
    gap: MAIN_GROUP_GAP,
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
  }),

  SearchTabGroup: styled(BlurView)({
    ...blurStyle,
    width: 60,
    height: 60,
    padding: 5,
  }),

  TabButton: styled(Pressable)({
    paddingHorizontal: 19,
    paddingVertical: 13,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  }),
};
