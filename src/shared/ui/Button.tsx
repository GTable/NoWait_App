import styled from "@emotion/native";
import { Images } from "../assets/images";
import React from "react";
import { typography } from "../../app/styles/typography";
import { colors } from "@/app/styles/colors";

// 새로운 버튼 스타일 정의 시 여기에 타입을 추가합니다.
// kakao: 카카오톡 로그인 버튼
// confirm14: 확인, 상세보기(border:14)
// confirm12: 확인하기(border:12)
type ButtonVariant = "kakao" | "confirm14" | "confirm12";

interface ButtonProps {
  variant: ButtonVariant;
  onPress?: () => void;
  children?: React.ReactNode;
}

const BUTTON_STYLES: Record<
  ButtonVariant,
  {
    backgroundColor: string;
    textColor: string;
    borderRadius: number;
    icon?: keyof typeof Images;
    text?: string;
  }
> = {
  // 버튼의 스타일을 추가하고 싶은 경우 여기에 정의합니다.
  kakao: {
    backgroundColor: "#FEE500",
    textColor: "#262200",
    borderRadius: 12,
    icon: "kakao-logo",
    text: "카카오톡으로 시작하기",
  },
  // 기본적으로는 확인하기가 나오며, 직접 입력하여 내부 텍스트를 변경할 수 있습니다.
  confirm14: {
    backgroundColor: colors.black[100],
    textColor: colors.black[30],
    borderRadius: 14,
    text: "확인하기",
  },

  confirm12: {
    backgroundColor: colors.black[100],
    textColor: colors.black[30],
    borderRadius: 12,
    text: "확인",
  },
};

export const Button = ({ variant, onPress, children }: ButtonProps) => {
  const style = BUTTON_STYLES[variant];

  return (
    <E.Container
      onPress={onPress}
      style={{
        backgroundColor: style.backgroundColor,
        borderRadius: style.borderRadius,
      }}
    >
      <E.ContentContainer>
        {style.icon && <E.Icon source={Images[style.icon]} />}
        <E.Text style={{ color: style.textColor }}>
          {children || style.text}
        </E.Text>
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
