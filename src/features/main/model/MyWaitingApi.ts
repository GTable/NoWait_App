import { usersApiTest } from "@/shared/api/usersApiTest";
import { z } from "zod";

const MyWaitingItemSchema = z.object({
  reservationId: z.string(),
  storeId: z.number(),
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
  storeName: string;
  teamsAhead: number;
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
      storeName: item.storeName,
      teamsAhead: item.teamsAhead,
      profileImageUrl: item.profileImageUrl,
    }));
  } catch {
    return [];
  }
};
