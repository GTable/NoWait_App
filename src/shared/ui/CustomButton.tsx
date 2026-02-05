import styled from "@emotion/native";
import { Images } from "../assets/images";
import React from "react";
import { typography } from "@/app/styles/typography";
import { colors } from "@/app/styles/colors";
import { ImageSourcePropType, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { usePressScaleAnimation } from "../interaction/usePressScaleAnimation";

const BUTTON_PRESS_ANIMATION = {
  scale: 0.96,
  opacity: 1,
  dimColor: "rgba(0, 0, 0, 0.1)",
  damping: 55,
  stiffness: 1000,
};

// 새로운 버튼 스타일 정의 시 여기에 타입을 추가합니다.
// kakaoLogin: 카카오톡 로그인 버튼
// rounded12: 모서리가 12인 기본 스타일의 버튼
type ButtonVariant = "kakaoLogin" | "rounded12";

interface ButtonProps {
  variant: ButtonVariant;
  onPress?: () => void;
  children?: React.ReactNode;
  icon?: ImageSourcePropType;
  animated?: boolean; // 애니메이션 활성화 여부
}

const BUTTON_STYLES: Record<
  ButtonVariant,
  {
    backgroundColor: string;
    textColor: string;
    borderRadius: number;
    gap: number;
    icon?: keyof typeof Images;
    text?: string;
  }
> = {
  // 버튼의 스타일을 추가하고 싶은 경우 여기에 정의합니다.
  kakaoLogin: {
    backgroundColor: "#FEE500",
    textColor: "#262200",
    borderRadius: 12,
    gap: 10,
    icon: "kakao-logo",
    text: "카카오톡으로 시작하기",
  },

  // 모서리가 12인 기본 스타일의 버튼입니다.
  rounded12: {
    backgroundColor: colors.coolBlack[100],
    textColor: colors.white[100],
    borderRadius: 12,
    gap: 4,
    text: "호출",
  },
};

export const CustomButton = ({
  variant,
  onPress,
  children,
  icon,
  animated = false,
}: ButtonProps) => {
  const style = BUTTON_STYLES[variant];
  const iconSource = icon || (style.icon && Images[style.icon]);
  const hasText = children || style.text;

  if (animated) {
    const {
      isPressed,
      dimStyle,
      animatedStyle,
      handlePressIn,
      handlePressOut,
    } = usePressScaleAnimation(BUTTON_PRESS_ANIMATION);

    return (
      <E.AnimatedWrapper>
        {isPressed && (
          <E.Dim style={[{ borderRadius: style.borderRadius }, dimStyle]} />
        )}
        <Animated.View style={animatedStyle}>
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
          >
            <E.AnimatedContainer
              style={{
                backgroundColor: style.backgroundColor,
                borderRadius: style.borderRadius,
              }}
            >
              <E.ContentContainer style={{ gap: style.gap }}>
                {iconSource && <E.Icon source={iconSource} />}
                {hasText && (
                  <E.Text style={{ color: style.textColor }}>
                    {children || style.text}
                  </E.Text>
                )}
              </E.ContentContainer>
            </E.AnimatedContainer>
          </Pressable>
        </Animated.View>
      </E.AnimatedWrapper>
    );
  }

  return (
    <E.Container
      onPress={onPress}
      style={{
        backgroundColor: style.backgroundColor,
        borderRadius: style.borderRadius,
      }}
    >
      <E.ContentContainer style={{ gap: style.gap }}>
        {iconSource && <E.Icon source={iconSource} />}
        {hasText && (
          <E.Text style={{ color: style.textColor }}>
            {children || style.text}
          </E.Text>
        )}
      </E.ContentContainer>
    </E.Container>
  );
};

const E = {
  Container: styled.TouchableOpacity({
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
  }),

  ContentContainer: styled.View({
    flexDirection: "row",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  }),

  Icon: styled.Image({
    width: 19,
    height: 19,
    resizeMode: "contain",
  }),

  Text: styled.Text({
    ...typography["button-17-semibold"],
  }),

  // 애니메이션 래퍼 - relative positioning을 위함
  AnimatedWrapper: styled.View({
    position: "relative",
    width: "100%",
  }),

  // 애니메이션용 컨테이너 (TouchableOpacity 대신 View)
  AnimatedContainer: styled.View({
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
  }),

  // Dim 효과
  Dim: styled.View({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 12,
    zIndex: 1,
  }),
};
