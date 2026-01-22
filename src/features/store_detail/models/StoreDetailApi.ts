import { storeApi } from "@/shared/api/storeApi";
import { StoreDetail } from "../types";

// API 응답 타입
interface StoreDetailApiResponse {
  success: boolean;
  response: StoreDetailApiItem;
}

interface StoreDetailApiItem {
  storeId: number;
  publicCode: string;
  bookmarkId: number | null;
  isBookmark: boolean;
  waitingCount: number;
  isWaiting: boolean;
  departmentId: number;
  departmentName: string;
  name: string;
  location: string;
  description: string;
  noticeTitle: string;
  noticeContent: string;
  openTime: string;
  profileImage: {
    id: number;
    storeId: number;
    imageUrl: string;
    imageType: string;
  } | null;
  bannerImages: {
    id: number;
    storeId: number;
    imageUrl: string;
    imageType: string;
  }[];
  isActive: boolean;
  deleted: boolean;
  createdAt: string;
}

// 주점 상세 정보 조회 API
export const getStoreDetail = async (
  publicCode: string
): Promise<StoreDetail> => {
  const response = (await storeApi.get(
    `/${publicCode}`
  )) as StoreDetailApiResponse;

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
