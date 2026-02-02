import { usersApi } from "@/shared/api/usersApi";
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
 * 대기 등록 API
 * @param publicCode - 주점 공개 코드
 * @param partySize - 입장 인원 수
 * @param idempotencyKey - 멱등성 키 (10분 TTL, 중복 방지)
 * @returns 대기 등록 결과 (대기 번호, 인원 수)
 */
export const registerWaiting = async (
  publicCode: string,
  partySize: number,
  idempotencyKey: string,
): Promise<WaitingRegisterResult> => {
  const rawResponse = await usersApi.post(
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
