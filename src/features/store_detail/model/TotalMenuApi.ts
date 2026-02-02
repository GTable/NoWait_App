import { storeApi } from "@/shared/api/storeApi";
import { z } from "zod";

const MenuImageSchema = z.object({
  imageUrl: z.string(),
});

const MenuApiItemSchema = z.object({
  menuId: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  isSoldOut: z.boolean(),
  images: z.array(MenuImageSchema),
});

const TotalMenuApiResponseSchema = z.object({
  success: z.boolean(),
  response: z
    .object({
      storeName: z.string(),
      menuReadDto: z.array(MenuApiItemSchema),
    })
    .nullable()
    .optional(),
});

export interface MenuItem {
  menuId: number;
  name: string;
  description: string;
  price: number;
  isSoldOut: boolean;
  imageUrl?: string;
}

export interface TotalMenu {
  storeName: string;
  menus: MenuItem[];
}

/**
 * 주점 메뉴 조회 API
 * @param publicCode - 주점 공개 코드
 * @returns 메뉴 목록 (이름, 가격, 이미지, 품절 여부)
 */
export const getTotalMenu = async (
  publicCode: string,
): Promise<TotalMenu | null> => {
  const rawResponse = await storeApi.get(`/${publicCode}/menus`);

  const response = TotalMenuApiResponseSchema.parse(rawResponse);

  if (!response.success || !response.response) {
    return null;
  }

  const { storeName, menuReadDto } = response.response;

  return {
    storeName,
    menus: menuReadDto.map(
      (menu): MenuItem => ({
        menuId: menu.menuId,
        name: menu.name,
        description: menu.description,
        price: menu.price,
        isSoldOut: menu.isSoldOut,
        imageUrl: menu.images[0]?.imageUrl,
      }),
    ),
  };
};
