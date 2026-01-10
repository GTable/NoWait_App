import styled from "@emotion/native";
import { Images } from "../assets/images";
import React from "react";
import { typography } from "../../app/styles/typography";
import { colors } from "@/app/styles/colors";
import { ImageSourcePropType } from "react-native";

// 새로운 버튼 스타일 정의 시 여기에 타입을 추가합니다.
// kakaoLogin: 카카오톡 로그인 버튼
// rounded12: 모서리가 12인 기본 스타일의 버튼
type ButtonVariant = "kakaoLogin" | "rounded12";

interface ButtonProps {
  variant: ButtonVariant;
  onPress?: () => void;
  children?: React.ReactNode;
  icon?: ImageSourcePropType;
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
}: ButtonProps) => {
  const style = BUTTON_STYLES[variant];
  const iconSource = icon || (style.icon && Images[style.icon]);
  const hasText = children || style.text;

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
};
