import { ScreenLayout } from "@/app/layout/ScreenLayout";
import { OnboardSlide } from "@/features/login/components/OnboardSlide";
import { Button } from "@/shared/ui/Button";
import styled from "@emotion/native";
import React from "react";

const LoginScreen = () => {
  return (
    <ScreenLayout>
      <E.Container>
        <OnboardSlide />
      </E.Container>
      <E.ButtonContainer>
        <Button variant="kakao" />
      </E.ButtonContainer>
    </ScreenLayout>
  );
};

export default LoginScreen;

const E = {
  Container: styled.View({
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }),

  ButtonContainer: styled.View({
    width: "100%",
    paddingHorizontal: 25,
    paddingVertical: 32,
  }),
};
