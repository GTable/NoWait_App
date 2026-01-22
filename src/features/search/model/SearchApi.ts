import { storeApi } from "@/shared/api/storeApi";
import { SearchStore } from "../types";

// API 응답 타입
interface StoreSearchResponse {
  success: boolean;
  response: StoreSearchApiItem[];
}

interface StoreSearchApiItem {
  storeId: number;
  publicCode: string;
  departmentName: string;
  name: string;
  waitingCount: number;
  isActive: boolean;
  profileImage?: {
    imageUrl: string;
  } | null;
}

// 주점 검색 API
export const searchStores = async (keyword: string): Promise<SearchStore[]> => {
  const response = (await storeApi.get("/search", {
    params: { keyword },
  })) as StoreSearchResponse;

  if (!response?.success || response.response.length === 0) {
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
