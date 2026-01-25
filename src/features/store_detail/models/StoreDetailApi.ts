import { storeApi } from "@/shared/api/storeApi";
import { z } from "zod";

const ImageSchema = z.object({
  imageUrl: z.string(),
});

const StoreDetailApiItemSchema = z.object({
  storeId: z.number(),
  publicCode: z.string(),
  isBookmark: z.boolean(),
  waitingCount: z.number(),
  isWaiting: z.boolean(),
  departmentName: z.string(),
  name: z.string(),
  location: z.string(),
  description: z.string(),
  noticeTitle: z.string(),
  noticeContent: z.string(),
  openTime: z.string(),
  profileImage: ImageSchema.nullable(),
  bannerImages: z.array(ImageSchema),
  isActive: z.boolean(),
});

const StoreDetailApiResponseSchema = z.object({
  success: z.boolean(),
  response: StoreDetailApiItemSchema.nullable().optional(),
});

export interface StoreDetail {
  storeId: number;
  publicCode: string;
  isBookmark: boolean;
  waitingCount: number;
  isWaiting: boolean;
  departmentName: string;
  name: string;
  location: string;
  description: string;
  noticeTitle: string;
  noticeContent: string;
  openTime: string;
  isActive: boolean;
  profileImageUrl?: string;
  bannerImageUrls: string[];
}

// 주점 상세 정보 조회 API
export const getStoreDetail = async (
  publicCode: string
): Promise<StoreDetail | null> => {
  const rawResponse = await storeApi.get(`/${publicCode}`);

  const response = StoreDetailApiResponseSchema.parse(rawResponse);

  if (!response.success || !response.response) {
    return null;
  }

  const store = response.response;

  return {
    storeId: store.storeId,
    publicCode: store.publicCode,
    isBookmark: store.isBookmark,
    waitingCount: store.waitingCount,
    isWaiting: store.isWaiting,
    departmentName: store.departmentName,
    name: store.name,
    location: store.location,
    description: store.description,
    noticeTitle: store.noticeTitle,
    noticeContent: store.noticeContent,
    openTime: store.openTime,
    profileImageUrl: store.profileImage?.imageUrl,
    bannerImageUrls: store.bannerImages.map((img) => img.imageUrl),
    isActive: store.isActive,
  };
};
