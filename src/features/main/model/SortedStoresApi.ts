import { storeApi } from "@/shared/api/storeApi";
import { z } from "zod";

const SortedStoresApiItemSchema = z.object({
  bannerImageUrl: z.string().optional(),
  departmentName: z.string(),
  storeId: z.string(),
  publicCode: z.string(),
  storeName: z.string(),
  waitingCount: z.number(),
});

const SortedStoresApiResponseSchema = z.object({
  success: z.boolean(),
  response: z.array(SortedStoresApiItemSchema),
});

export interface SortedStore {
  storeId: number;
  publicCode: string;
  name: string;
  departmentName: string;
  waitingCount: number;
  bannerImageUrl?: string;
}

/**
 * 대기 팀 수 정렬 조회 API
 * @param order - 정렬 기준 ("asc": 대기 적은 순, "desc": 인기 순)
 * @returns 대기 팀 수 및 주점 정보 (최대 5개)
 */
export const getSortedStores = async (
  order: "asc" | "desc",
): Promise<SortedStore[]> => {
  const rawResponse = await storeApi.get("/waiting-count", {
    params: { order },
  });

  const response = SortedStoresApiResponseSchema.parse(rawResponse);

  return response.response.map((store) => ({
    storeId: Number(store.storeId),
    publicCode: store.publicCode,
    name: store.storeName,
    departmentName: store.departmentName,
    waitingCount: store.waitingCount,
    bannerImageUrl: store.bannerImageUrl,
  }));
};
