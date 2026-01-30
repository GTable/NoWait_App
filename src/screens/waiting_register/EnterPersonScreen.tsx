import { ScreenLayout } from "@/app/layout/ScreenLayout";
import { BackHeader } from "@/shared/ui/BackHeader";
import { CustomButton } from "@/shared/ui/CustomButton";
import { EnterPersonRoute } from "@/features/waiting_register/routes";
import React from "react";
import styled from "@emotion/native";
import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { PersonCountStepper } from "@/features/waiting_register/components/PersonCountStepper";
import { useEnterPerson } from "@/features/waiting_register/hooks/useEnterPerson";

const EnterPersonScreen = () => {
  const { publicCode } = EnterPersonRoute.useParams();

  const { personCount, setPersonCount, handleBack, handleNext } =
    useEnterPerson({ publicCode });

  return (
    <ScreenLayout>
      <BackHeader onPress={handleBack} />

      <E.ContentWrapper>
        <E.PageTitle>대기 등록을 위해{"\n"}인원 수를 입력해주세요</E.PageTitle>

        {/* 인원 입력 영역 */}
        <E.PersonInputSection>
          <E.SectionLabel>입장 인원</E.SectionLabel>
          <PersonCountStepper value={personCount} onChange={setPersonCount} />
        </E.PersonInputSection>
      </E.ContentWrapper>

      <E.ButtonWrapper>
        <CustomButton variant="rounded12" onPress={handleNext}>
          다음
        </CustomButton>
      </E.ButtonWrapper>
    </ScreenLayout>
  );
};

export default EnterPersonScreen;

const E = {
  ContentWrapper: styled.View({
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingTop: 26,
    gap: 50,
  }),

  PageTitle: styled.Text({
    color: colors.black[100],
    ...typography["headline-24-bold"],
  }),

  PersonInputSection: styled.View({
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  }),

  SectionLabel: styled.Text({
    color: colors.black[100],
    ...typography["title-20-semibold"],
  }),

  ButtonWrapper: styled.View({
    top: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  }),
};
