import { storeApi } from "@/shared/api/storeApi";

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

export interface SearchStore {
  storeId: string;
  publicCode: string;
  name: string;
  departmentName: string;
  storeLogoUrl?: string;
  isActive: boolean;
  waitingCount: number;
}

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
