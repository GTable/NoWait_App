import { ScreenLayout } from "@/app/layout/ScreenLayout";
import { OnboardSlide } from "@/features/login/components/OnboardSlide";
import { useKakaoLogin } from "@/features/login/hooks/useKakaoLogin";
import { CustomButton } from "@/shared/ui/CustomButton";
import { CustomToast } from "@/shared/ui/CustomToast";
import { LoginLoadingOverlay } from "./LoginLoadingOverlay";
import styled from "@emotion/native";
import React from "react";

const LoginScreen = () => {
  const { handleKakaoLogin, showToast, isLoading } = useKakaoLogin();

  return (
    <ScreenLayout>
      {/* 온보딩 슬라이드 */}
      <E.Container>
        <OnboardSlide />
      </E.Container>

      {/* 로그인 실패 토스트 */}
      {showToast && (
        <E.ToastContainer>
          <CustomToast />
        </E.ToastContainer>
      )}

      {/* 카카오 로그인 버튼 */}
      <E.ButtonContainer>
        <CustomButton variant="kakaoLogin" onPress={handleKakaoLogin} />
      </E.ButtonContainer>

      {/* 로그인 로딩 오버레이 */}
      {isLoading && <LoginLoadingOverlay />}
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

  ToastContainer: styled.View({
    position: "absolute",
    bottom: 144,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 9999,
  }),

  ButtonContainer: styled.View({
    width: "100%",
    paddingHorizontal: 25,
    paddingVertical: 32,
  }),
};
