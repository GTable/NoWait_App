import { usersApiTest } from "../../../shared/api/usersApiTest";
import { z } from "zod";

const WaitingRegisterResponseSchema = z.object({
  success: z.boolean(),
  response: z.object({
    waitingNumber: z.string(),
    partySize: z.number(),
  }),
});

export interface WaitingRegisterResult {
  waitingNumber: string;
  partySize: number;
}

/**
 * 대기 등록 API (테스트용 v2)
 * @param publicCode - 주점 공개 코드
 * @param partySize - 입장 인원 수
 * @param idempotencyKey - 멱등성 키 (10분 동안 재사용)
 * @returns 대기 등록 결과 (예약번호, 대기 순위 등)
 */
export const registerWaitingTest = async (
  publicCode: string,
  partySize: number,
  idempotencyKey: string,
): Promise<WaitingRegisterResult> => {
  const rawResponse = await usersApiTest.post(
    `/waitings/${publicCode}`,
    { partySize },
    {
      headers: {
        "Idempotency-Key": idempotencyKey,
      },
    },
  );

  const response = WaitingRegisterResponseSchema.parse(rawResponse);

  return response.response;
};
