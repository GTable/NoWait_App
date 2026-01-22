// 검색 결과 주점 타입
export interface SearchStore {
  storeId: string;
  publicCode: string;
  name: string;
  departmentName: string;
  storeLogoUrl?: string;
  isActive: boolean;
  waitingCount: number;
}

// 최근 검색어 타입
export interface RecentSearchItem {
  publicCode: string;
  name: string;
}
