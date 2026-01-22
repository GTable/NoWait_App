// 주점 상세 정보 타입
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

// 메뉴 아이템 타입
export interface MenuItem {
  menuId: number;
  name: string;
  description: string;
  price: number;
  isSoldOut: boolean;
  imageUrl?: string;
}

// 전체 메뉴 타입
export interface TotalMenu {
  storeName: string;
  menus: MenuItem[];
}
