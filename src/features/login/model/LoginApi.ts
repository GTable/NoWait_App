import { api } from "@/shared/api/axios";
import * as SecureStore from "expo-secure-store";

/**
 * 카카오 로그인 API 응답 타입
 */
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
/**
 * 카카오 로그인 처리
 * @param kakaoAccessToken - 카카오 SDK에서 받은 액세스 토큰
 * @returns 서버 로그인 응답 (사용자 정보, 토큰, 신규 사용자 여부 포함)
 */ export const kakaoLogin = async (
  kakaoAccessToken: string,
): Promise<KakaoLoginResponse> => {
  const response = (await api.post("/auth/app/kakao/login", {
    kakaoAccessToken,
  })) as KakaoLoginResponse;

  // 토큰 저장
  if (response.response.accessToken) {
    await SecureStore.setItemAsync(
      "accessToken",
      response.response.accessToken,
    );
  }

  if (response.response.refreshToken) {
    await SecureStore.setItemAsync(
      "refreshToken",
      response.response.refreshToken,
    );
  }

  return response;
};
