import { storeApi } from "@/shared/api/storeApi";
import { z } from "zod";

const ProfileImageSchema = z.object({
  id: z.number(),
  storeId: z.number(),
  imageUrl: z.string(),
  imageType: z.string(),
});

const BannerImageSchema = z.object({
  id: z.number(),
  storeId: z.number(),
  imageUrl: z.string(),
  imageType: z.string(),
});

const StoreItemSchema = z.object({
  storeId: z.number(),
  publicCode: z.string(),
  bookmarkId: z.number().nullable(),
  isBookmark: z.boolean(),
  waitingCount: z.number(),
  departmentId: z.number(),
  departmentName: z.string(),
  name: z.string(),
  location: z.string(),
  description: z.string(),
  noticeTitle: z.string(),
  noticeContent: z.string(),
  openTime: z.string(),
  profileImage: ProfileImageSchema.nullable(),
  bannerImages: z.array(BannerImageSchema),
  isActive: z.boolean(),
  deleted: z.boolean(),
  createdAt: z.string(),
});

const AllStoresApiResponseSchema = z.object({
  success: z.boolean(),
  response: z.object({
    storePageReadResponses: z.array(StoreItemSchema),
    hasNext: z.boolean(),
  }),
});

export interface AllStore {
  storeId: number;
  publicCode: string;
  name: string;
  departmentName: string;
  storeLogoUrl?: string;
  isActive: boolean;
  waitingCount: number;
}

export interface AllStoresResponse {
  stores: AllStore[];
  hasNext: boolean;
}

/**
 * 모든 주점 조회 API
 * @param page - 페이지 번호 (0부터 시작)
 * @param size - 한 페이지에 가져올 개수
 * @returns 주점 목록 및 다음 페이지 존재 여부
 */
export const getAllStores = async (
  page: number = 0,
  size: number = 20,
): Promise<AllStoresResponse> => {
  const rawResponse = await storeApi.get("", {
    params: {
      page,
      size,
    },
  });

  const response = AllStoresApiResponseSchema.parse(rawResponse);

  return {
    stores: response.response.storePageReadResponses.map((store) => ({
      storeId: store.storeId,
      publicCode: store.publicCode,
      name: store.name,
      departmentName: store.departmentName,
      storeLogoUrl: store.profileImage?.imageUrl,
      isActive: store.isActive,
      waitingCount: store.waitingCount,
    })),
    hasNext: response.response.hasNext,
  };
};
