import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "@emotion/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { SvgIcons } from "../assets/images";
import { typography } from "@/app/styles/typography";
import { colors } from "@/app/styles/colors";

type TabIconKey = keyof typeof SvgIcons;

const TAB_ICONS: Record<
  string,
  { active: TabIconKey; inactive: TabIconKey; label: string }
> = {
  Main: {
    active: "bottom-tab-home-active",
    inactive: "bottom-tab-home-inactive",
    label: "홈",
  },
  Search: {
    active: "bottom-tab-search-active",
    inactive: "bottom-tab-search-inactive",
    label: "검색",
  },
  Map: {
    active: "bottom-tab-map-active",
    inactive: "bottom-tab-map-inactive",
    label: "지도",
  },
  MyPage: {
    active: "bottom-tab-mypage-active",
    inactive: "bottom-tab-mypage-inactive",
    label: "마이페이지",
  },
};

export const CustomBottomTab = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <E.Container>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const tabConfig = TAB_ICONS[route.name];

        if (!tabConfig) return null;

        const onPress = () => {
          // Search 탭은 바텀바 없는 검색 스크린으로 이동
          if (route.name === "Search") {
            navigation.getParent()?.navigate("Search");
            return;
          }

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const IconComponent =
          SvgIcons[isFocused ? tabConfig.active : tabConfig.inactive];

        return (
          <E.TabButton
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
          >
            <E.IconWrapper>
              <IconComponent width={24} height={24} />
            </E.IconWrapper>
            <E.Label isFocused={isFocused}>{tabConfig.label}</E.Label>
          </E.TabButton>
        );
      })}
    </E.Container>
  );
};

const E = {
  // 1. 프레임 (absolute, radius, 배경 투명 외부 / 흰색 내부)
  Container: styled.View({
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.06)",
    height: 80,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    gap: 62,
    paddingTop: 10,
    paddingBottom: 8,
  }),

  // 2. 각 아이콘을 담는 view
  TabButton: styled(TouchableOpacity)({
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  }),

  // 4-1. 아이콘 wrapper
  IconWrapper: styled.View({
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  }),

  // 4-2. 텍스트
  Label: styled.Text<{ isFocused: boolean }>((props) => ({
    ...typography["text-12-medium"],
    color: props.isFocused ? colors.black[90] : colors.black[50],
  })),
};
