import React from "react";
import styled from "@emotion/native";
import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { MinusSvg, PlusSvg } from "@/shared/assets/images";

/**
 * 인원 수 증감 Stepper 컴포넌트
 * - +/- 버튼으로 1씩 조절
 * - min/max 범위 제한 (기본 1~99명)
 */
interface PersonCountStepperProps {
  /** 현재 인원 수 */
  value: number;
  /** 인원 수 변경 함수 */
  onChange: (value: number) => void;
  /** 최소 인원 수 (default: 1) */
  min?: number;
  /** 최대 인원 수 (default: 99) */
  max?: number;
}

export const PersonCountStepper = ({
  value,
  onChange,
  min = 1,
  max = 99,
}: PersonCountStepperProps) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <E.Stepper>
      <E.MinusBox onPress={handleDecrease} disabled={value <= min}>
        <MinusSvg />
      </E.MinusBox>
      <E.NumberText>{value}</E.NumberText>
      <E.PlusBox onPress={handleIncrease} disabled={value >= max}>
        <PlusSvg />
      </E.PlusBox>
    </E.Stepper>
  );
};

const E = {
  Stepper: styled.View({
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  }),

  MinusBox: styled.TouchableOpacity({
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  }),

  NumberText: styled.Text({
    color: colors.black[80],
    textAlign: "center",
    ...typography["title-20-semibold"],
    width: 30,
  }),

  PlusBox: styled.TouchableOpacity({
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  }),
};
