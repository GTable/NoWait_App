import { storeApi } from "@/shared/api/storeApi";
import { z } from "zod";

const StoreSearchApiItemSchema = z.object({
  storeId: z.number(),
  publicCode: z.string(),
  departmentName: z.string(),
  name: z.string(),
  waitingCount: z.number(),
  isActive: z.boolean(),
  profileImage: z
    .object({
      imageUrl: z.string(),
    })
    .nullable()
    .optional(),
});

const StoreSearchResponseSchema = z.object({
  success: z.boolean(),
  response: z.array(StoreSearchApiItemSchema).nullable().optional(),
});

export interface SearchStore {
  storeId: string;
  publicCode: string;
  name: string;
  departmentName: string;
  storeLogoUrl?: string;
  isActive: boolean;
  waitingCount: number;
}

/**
 * 주점 검색 API
 * @param keyword - 검색어 (주점명, 메뉴, 학과)
 * @returns 검색된 주점 목록
 */
export const searchStores = async (keyword: string): Promise<SearchStore[]> => {
  const rawResponse = await storeApi.get("/search", {
    params: { keyword },
  });

  const response = StoreSearchResponseSchema.parse(rawResponse);

  if (
    !response.success ||
    !response.response ||
    response.response.length === 0
  ) {
    return [];
  }

  return response.response.map((store) => ({
    storeId: String(store.storeId),
    publicCode: store.publicCode,
    name: store.name,
    departmentName: store.departmentName,
    storeLogoUrl: store.profileImage?.imageUrl,
    isActive: store.isActive,
    waitingCount: store.waitingCount,
  }));
};
