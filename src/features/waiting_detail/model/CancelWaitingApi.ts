import { z } from "zod";
import { usersApiTest } from "@/shared/api/usersApiTest";

const CancelWaitingResponseSchema = z.object({
  success: z.boolean(),
  response: z.object({
    waitingNumber: z.string(),
    storeId: z.number(),
    reservationStatus: z.string(),
    canceledAt: z.string(),
    message: z.string(),
  }),
});

interface CancelWaitingParams {
  publicCode: string;
  waitingNumber: string;
}

export interface CancelWaitingResult {
  waitingNumber: string;
  storeId: number;
  reservationStatus: string;
  canceledAt: string;
  message: string;
}

/**
 * 대기 취소 API
 * @param publicCode - 주점 공개 코드
 * @param waitingNumber - 대기 번호
 */
export const cancelWaiting = async ({
  publicCode,
  waitingNumber,
}: CancelWaitingParams): Promise<CancelWaitingResult> => {
  const rawResponse = await usersApiTest.delete(`/waitings/${publicCode}`, {
    data: { waitingNumber },
  });
  const response = CancelWaitingResponseSchema.parse(rawResponse);
  return response.response;
};
