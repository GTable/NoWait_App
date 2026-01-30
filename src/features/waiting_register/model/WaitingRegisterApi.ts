import { usersApi } from "@/shared/api/usersApi";
import { z } from "zod";

const WaitingRegisterResponseSchema = z.object({
  success: z.boolean(),
  response: z.object({
    reservationNumber: z.string(),
    rank: z.number(),
    reserved: z.boolean(),
    partySize: z.number(),
  }),
});

export interface WaitingRegisterResult {
  reservationNumber: string;
  rank: number;
  reserved: boolean;
  partySize: number;
}

/**
 * 대기 등록 API
 * @param publicCode - 주점 공개 코드
 * @param partySize - 입장 인원 수
 * @param idempotencyKey - 멱등성 키 (10분 동안 재사용)
 * @returns 대기 등록 결과 (예약번호, 대기 순위 등)
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
