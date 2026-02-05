import { api } from "@/shared/api/axios";
import * as SecureStore from "expo-secure-store";
import { z } from "zod";

const KakaoLoginResponseSchema = z.object({
  success: z.boolean(),
  response: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    userId: z.number(),
    email: z.string(),
    nickName: z.string(),
    profileImage: z.string(),
    phoneEntered: z.boolean(),
    marketingAgree: z.boolean(),
    newUser: z.boolean(),
  }),
});

type KakaoLoginResponse = z.infer<typeof KakaoLoginResponseSchema>;

/**
 * 카카오 로그인 처리
 * @param kakaoAccessToken - 카카오 SDK에서 받은 액세스 토큰
 * @returns 서버 로그인 응답 (사용자 정보, 토큰, 신규 사용자 여부 포함)
 */
export const kakaoLogin = async (
  kakaoAccessToken: string,
): Promise<KakaoLoginResponse> => {
  const rawResponse = await api.post("/auth/app/kakao/login", {
    kakaoAccessToken,
  });

  const response = KakaoLoginResponseSchema.parse(rawResponse);

  if (!response.success) {
    throw new Error("서버 로그인 실패");
  }

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
