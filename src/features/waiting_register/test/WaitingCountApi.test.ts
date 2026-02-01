import { usersApiTest } from "../../../shared/api/usersApiTest";
import { z } from "zod";

const WaitingCountResponseSchema = z.object({
  success: z.boolean(),
  response: z.object({
    storeId: z.number(),
    waitingCount: z.number(),
    storeName: z.string(),
    departmentName: z.string(),
  }),
});

export interface WaitingCountResult {
  storeId: number;
  waitingCount: number;
  storeName: string;
  departmentName: string;
}

/**
 * 대기 팀 수 조회 API (테스트용)
 * @param publicCode - 주점 공개 코드
 * @returns 대기 팀 수 및 주점 정보
 */
export const getWaitingCountTest = async (
  publicCode: string,
): Promise<WaitingCountResult> => {
  const rawResponse = await usersApiTest.get(
    `/v2/users/me/waitings/${publicCode}/waiting-count`,
  );

  const response = WaitingCountResponseSchema.parse(rawResponse);

  return response.response;
};
