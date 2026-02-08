import { ScreenLayout } from "@/app/layout/ScreenLayout";
import { BackHeader } from "@/shared/ui/BackHeader";
import { CustomButton } from "@/shared/ui/CustomButton";
import { ConfirmWaitingRoute } from "@/features/waiting_register/routes";
import { WaitingTeamCount } from "@/features/waiting_register/components/WaitingTeamCount";
import { WaitingDetailInfo } from "@/features/waiting_register/components/WaitingDetailInfo";
import { WaitingNotice } from "@/features/waiting_register/components/WaitingNotice";
import { useConfirmWaiting } from "@/features/waiting_register/hooks/useConfirmWaiting";
import React from "react";
import styled from "@emotion/native";

const ConfirmWaitingScreen = () => {
  const { publicCode, partySize } = ConfirmWaitingRoute.useParams();
  const { waitingInfo, isLoading, handleBack, handleRegister } =
    useConfirmWaiting({ publicCode, partySize });

  if (isLoading || !waitingInfo) {
    return (
      <ScreenLayout>
        <BackHeader onPress={handleBack} />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <BackHeader onPress={handleBack} />

      {/* 대기 정보 영역 */}
      <E.ContentWrapper>
        <E.InfoSection>
          <WaitingTeamCount count={waitingInfo.waitingCount} />
          <WaitingDetailInfo
            boothName={waitingInfo.boothName}
            partySize={partySize}
          />
        </E.InfoSection>

        {/* 대기 등록 전 안내사항 */}
        <WaitingNotice />
      </E.ContentWrapper>

      {/* 등록 버튼 */}
      <E.ButtonWrapper>
        <CustomButton variant="rounded16" onPress={handleRegister}>
          등록하기
        </CustomButton>
      </E.ButtonWrapper>
    </ScreenLayout>
  );
};

export default ConfirmWaitingScreen;

const E = {
  ContentWrapper: styled.View({
    flex: 1,
    flexDirection: "column",
    paddingTop: 26,
  }),

  InfoSection: styled.View({
    flexDirection: "column",
    paddingHorizontal: 20,
  }),

  ButtonWrapper: styled.View({
    top: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  }),
};
