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

// 선택 정보 업데이트 API
export const updateOptionalInfo = async (
  phoneNumber: string,
  consent: boolean
): Promise<boolean> => {
  const accessToken = await SecureStore.getItemAsync("accessToken");

  const rawResponse = await usersApi.put("/optional", {
    phoneNumber,
    consent,
    accessToken,
  });

  const response = UpdateOptionalInfoResponseSchema.parse(rawResponse);

  // 새로운 토큰 저장
  if (response.response.access_token) {
    await SecureStore.setItemAsync("accessToken", response.response.access_token);
  }

  if (response.response.refresh_token) {
    await SecureStore.setItemAsync("refreshToken", response.response.refresh_token);
  }

  return response.success;
};
