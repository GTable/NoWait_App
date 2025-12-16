import { api } from "@/shared/api/axios";
import * as SecureStore from "expo-secure-store";

interface KakaoLoginRequest {
  kakaoAccessToken: string;
}

interface KakaoLoginResponse {
  success: boolean;
  response: {
    accessToken: string;
    refreshToken: string;
    userId: number;
    email: string;
    nickName: string;
    profileImage: string;
    phoneEntered: boolean;
    marketingAgree: boolean;
    newUser: boolean;
  };
}

export const kakaoLogin = async (
  kakaoAccessToken: string
): Promise<KakaoLoginResponse> => {
  const response = await api.post<KakaoLoginRequest, KakaoLoginResponse>(
    "/v2/app/oauth/kakao/login",
    {
      kakaoAccessToken,
    }
  );

  // 토큰 저장
  if (response.response.accessToken) {
    await SecureStore.setItemAsync(
      "accessToken",
      response.response.accessToken
    );
  }

  if (response.response.refreshToken) {
    await SecureStore.setItemAsync(
      "refreshToken",
      response.response.refreshToken
    );
  }

  return response;
};
