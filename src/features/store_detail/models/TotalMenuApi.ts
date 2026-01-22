import { storeApi } from "@/shared/api/storeApi";
import { MenuItem, TotalMenu } from "../types";

// API 응답 타입
interface TotalMenuApiResponse {
  success: boolean;
  response: {
    storeName: string;
    menuReadDto: MenuApiItem[];
  };
}

interface MenuApiItem {
  menuId: number;
  storeId: number;
  name: string;
  description: string;
  price: number;
  sortOrder: number;
  isSoldOut: boolean;
  deleted: boolean;
  images: {
    id: number;
    imageUrl: string;
  }[];
}

// 주점 메뉴 조회 API
export const getTotalMenu = async (publicCode: string): Promise<TotalMenu> => {
  const response = (await storeApi.get(
    `/${publicCode}/menus`
  )) as TotalMenuApiResponse;

  const { storeName, menuReadDto } = response.response;

  return {
    storeName,
    menus: menuReadDto.map((menu): MenuItem => ({
      menuId: menu.menuId,
      name: menu.name,
      description: menu.description,
      price: menu.price,
      isSoldOut: menu.isSoldOut,
      imageUrl: menu.images[0]?.imageUrl,
    })),
  };
};
