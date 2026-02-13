import { z } from "zod";
import { usersApiTest } from "@/shared/api/usersApiTest";
import { formatDateTime } from "@/shared/utils/formatDateTime";
import { formatWaitingNumber } from "@/shared/utils/formatWaitingNumber";

const MyWaitingItemSchema = z.object({
  reservationId: z.string(),
  storeId: z.number(),
  publicCode: z.string(),
  storeName: z.string(),
  departmentName: z.string(),
  rank: z.number(),
  teamsAhead: z.number(),
  partySize: z.number(),
  status: z.string(),
  registeredAt: z.string(),
  location: z.string(),
  profileImageUrl: z.string(),
  bannerImageUrl: z.union([z.string(), z.array(z.string())]).optional(),
});

const MyWaitingResponseSchema = z.object({
  success: z.boolean(),
  response: z.array(MyWaitingItemSchema),
});

export interface MyWaiting {
  waitingNumber: string;
  publicCode: string;
  storeName: string;
  departmentName: string;
  teamsAhead: number;
  partySize: number;
  registeredAt: string;
  location: string;
  profileImageUrl: string;
}

/**
 * 나의 대기 목록 조회
 * @returns 현재 대기 중인 주점 목록
 */
export const getMyWaitings = async (): Promise<MyWaiting[]> => {
  try {
    const raw = await usersApiTest.get("/waitings");
    const validated = MyWaitingResponseSchema.parse(raw);

    return validated.response.map((item) => ({
      waitingNumber: formatWaitingNumber(item.reservationId),
      publicCode: item.publicCode,
      storeName: item.storeName,
      departmentName: item.departmentName,
      teamsAhead: item.teamsAhead,
      partySize: item.partySize,
      registeredAt: formatDateTime(item.registeredAt),
      location: item.location,
      profileImageUrl: item.profileImageUrl,
    }));
  } catch {
    return [];
  }
};
