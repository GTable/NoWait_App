import { usersApi } from "@/shared/api/usersApi";
import * as SecureStore from "expo-secure-store";
import { z } from "zod";

const UpdateOptionalInfoResponseSchema = z.object({
  success: z.boolean(),
  response: z.object({
    access_token: z.string(),
    refresh_token: z.string(),
  }),
});

/**
 * 선택 정보(전화번호, 마케팅 동의) 업데이트 API
 * @param phoneNumber - 하이픈 제거된 전화번호
 * @param consent - 마케팅 정보 수신 동의 여부
 * @returns 성공 여부
 */
export const updateOptionalInfo = async (
  phoneNumber: string,
  consent: boolean,
): Promise<boolean> => {
  const accessToken = await SecureStore.getItemAsync("accessToken");

  const rawResponse = await usersApi.put("/optional", {
    phoneNumber,
    consent,
    accessToken,
  });

  const response = UpdateOptionalInfoResponseSchema.parse(rawResponse);

  // 새로운 토큰 저장
  await Promise.all([
    SecureStore.setItemAsync("accessToken", response.response.access_token),
    SecureStore.setItemAsync("refreshToken", response.response.refresh_token),
  ]);

  return response.success;
};
