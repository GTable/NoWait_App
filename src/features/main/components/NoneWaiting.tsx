import { colors } from "@/app/styles/colors";
import { NormalPlus } from "@/shared/assets/images";
import styled from "@emotion/native";

interface NoneWaitingSectionProps {
  variant?: "empty" | "limit";
  onPressFind?: () => void;
}

export const NoneWaitingSection = ({
  variant = "empty",
  onPressFind,
}: NoneWaitingSectionProps) => {
  const message =
    variant === "limit"
      ? "최대 3개의 예약이 가능해요"
      : "아직 대기 중인 부스가 없어요";
  return (
    <E.Container>
      <E.Message>{message}</E.Message>

      <E.FindButton onPress={onPressFind}>
        <E.FindButtonText numberOfLines={1}>부스 찾기</E.FindButtonText>
        <E.PlusIcon>
          <NormalPlus />
        </E.PlusIcon>
      </E.FindButton>
    </E.Container>
  );
};

const E = {
  Container: styled.View({
    width: "100%",
    paddingTop: 14,
    paddingRight: 14,
    paddingLeft: 18,
    paddingBottom: 18,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    height: 145,

    borderRadius: 22,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.02)",
    backgroundColor: colors.black[15],
  }),

  Message: styled.Text({
    color: colors.black[70],
    textAlign: "center",
    fontFamily: "Pretendard",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 20.16,
  }),

  FindButton: styled.TouchableOpacity({
    paddingVertical: 8,
    paddingLeft: 14,
    paddingRight: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    flexWrap: "nowrap",

    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  }),

  FindButtonText: styled.Text({
    overflow: "hidden",
    color: colors.black[70],
    textAlign: "center",
    fontFamily: "Pretendard",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 21,
  }),

  PlusIcon: styled.View({
    width: 14,
    height: 14,
    alignItems: "center",
    justifyContent: "center",
  }),
};
