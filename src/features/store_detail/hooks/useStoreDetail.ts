import { useEffect, useState } from "react";
import { getStoreDetail, StoreDetail } from "../model/StoreDetailApi";
import { getTotalMenu, MenuItem } from "../model/TotalMenuApi";

/**
 * 주점 상세 정보와 메뉴를 가져오는 훅
 *
 * @param publicCode - 주점 고유 코드
 * @returns storeDetail, menus 상태
 */
export const useStoreDetail = (publicCode: string) => {
  const [storeDetail, setStoreDetail] = useState<StoreDetail | null>(null);
  const [menus, setMenus] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailData, menuData] = await Promise.all([
          getStoreDetail(publicCode),
          getTotalMenu(publicCode),
        ]);
        setStoreDetail(detailData);
        setMenus(menuData.menus);
      } catch (error) {
        console.error("Failed to fetch store detail:", error);
      }
    };

    fetchData();
  }, [publicCode]);

  return { storeDetail, menus };
};
