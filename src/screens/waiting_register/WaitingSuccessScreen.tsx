import { ScreenLayout } from "@/app/layout/ScreenLayout";
import { CustomButton } from "@/shared/ui/CustomButton";
import { useWaitingSuccess } from "@/features/waiting_register/hooks/useWaitingSuccess";
import React from "react";
import styled from "@emotion/native";
import { WaitingSvg } from "@/shared/assets/images/store_detail/WaitingSvg";
import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";

const WaitingSuccessScreen = () => {
  const { handleConfirm } = useWaitingSuccess();

  return (
    <ScreenLayout>
      {/* 성공 메시지 영역 */}
      <E.ContentWrapper>
        <WaitingSvg />

        <E.Title>대기 등록 완료</E.Title>
        <E.SubTitle>
          원활한 운영을 위해 호출 시{"\n"}10분 이내로 입장해주세요!
        </E.SubTitle>
      </E.ContentWrapper>

      {/* 확인 버튼 */}
      <E.ButtonWrapper>
        <CustomButton variant="rounded12" onPress={handleConfirm}>
          확인
        </CustomButton>
      </E.ButtonWrapper>
    </ScreenLayout>
  );
};

export default WaitingSuccessScreen;

const E = {
  ContentWrapper: styled.View({
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  }),

  Title: styled.Text({
    alignSelf: "stretch",
    textAlign: "center",
    color: colors.black[100],
    ...typography["headline-24-bold"],
  }),

  SubTitle: styled.Text({
    textAlign: "center",
    color: colors.black[70],
    ...typography["text-16-regular"],
  }),

  ButtonWrapper: styled.View({
    top: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  }),
};
