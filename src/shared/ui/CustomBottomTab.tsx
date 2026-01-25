/**
 * 커스텀 하단 탭 바 컴포넌트
 * - 메인 탭 그룹 (홈, 지도, 마이페이지)과 검색 탭 그룹으로 분리
 * - LinearGradient 배경과 BlurView 효과 적용
 */

import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "@emotion/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { SvgIcons } from "../assets/images";
import { colors } from "@/app/styles/colors";

type TabIconKey = keyof typeof SvgIcons;

/** 탭별 아이콘 설정 */
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
const MAIN_TABS = new Set(["Main", "Map", "MyPage"]);

/** Blur 효과 설정 */
const BLUR_PROPS = { intensity: 40, tint: "light" } as const;

/** 그라디언트 색상 (투명 → 회색) */
const GRADIENT_COLORS = ["#E8E8E800", "#E8E8E8CC"] as const;

/** 그라디언트 방향 (위 → 아래) */
const GRADIENT_DIRECTION = { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } };

export const CustomBottomTab = ({ state, navigation }: BottomTabBarProps) => {
  const handlePress = (name: string, key: string, isFocused: boolean) => {
    // 검색 탭은 별도 스크린으로 이동
    if (name === "Search") {
      navigation.getParent()?.navigate("Search");
      return;
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
      <E.TabButton
        key={key}
        isFocused={isFocused}
        onPress={() => handlePress(name, key, isFocused)}
      >
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
        {state.routes
          .filter((r) => MAIN_TABS.has(r.name))
          .map((r) =>
            renderTab(r.name, r.key, state.index === state.routes.indexOf(r)),
          )}
      </E.MainTabGroup>

      {/* 검색 탭 (원형) */}
      {state.routes
        .filter((r) => r.name === "Search")
        .map((r) => (
          <E.SearchTabGroup key={r.key} {...BLUR_PROPS}>
            {renderTab(r.name, r.key, state.index === state.routes.indexOf(r))}
          </E.SearchTabGroup>
        ))}
    </LinearGradient>
  );
};

/** 컨테이너 스타일 */
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

/** 공통 BlurView 스타일 */
const blurStyle = {
  alignItems: "center" as const,
  justifyContent: "center" as const,
  borderRadius: 999,
  borderWidth: 1,
  borderColor: colors.white[100],
};

const E = {
  /** 메인 탭 그룹 (홈, 지도, 마이페이지) */
  MainTabGroup: styled(BlurView)({
    ...blurStyle,
    flexDirection: "row",
    height: 60,
    paddingHorizontal: 6,
    paddingVertical: 20,
    gap: 6,
  }),

  /** 검색 탭 그룹 (원형) */
  SearchTabGroup: styled(BlurView)({
    ...blurStyle,
    width: 60,
    height: 60,
    padding: 5,
  }),

  /** 탭 버튼 (선택 시 배경 표시) */
  TabButton: styled(TouchableOpacity)<{ isFocused: boolean }>(
    ({ isFocused }) => ({
      width: 62,
      height: 50,
      paddingHorizontal: 19,
      paddingVertical: 13,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 999,
      ...(isFocused && {
        borderWidth: 0.5,
        borderColor: "#00000005",
        backgroundColor: "#B6B6B61A",
      }),
    }),
  ),
};
