import { useEffect, useState } from "react";
import { getStoreDetail, StoreDetail } from "../model/StoreDetailApi";
import { getTotalMenu, MenuItem } from "../model/TotalMenuApi";
import { toggleBookmark } from "../model/BookmarkApi";

/**
 * 주점 상세 정보와 메뉴를 가져오는 훅
 *
 * @param publicCode - 주점 고유 코드
 * @returns storeDetail, menus, handleBookmarkToggle 상태 및 함수
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
        setMenus(menuData?.menus ?? []);
      } catch (error) {
        console.error("주점 상세 정보를 불러오는데 실패했습니다:", error);
      }
    };

    fetchData();
  }, [publicCode]);

  /**
   * 북마크 토글 핸들러
   * - 낙관적 업데이트로 즉각 반응
   */
  const handleBookmarkToggle = async () => {
    if (!storeDetail) return;

    const previousState = storeDetail.isBookmark;

    // UI 먼저 변경
    setStoreDetail({ ...storeDetail, isBookmark: !previousState });

    try {
      await toggleBookmark(storeDetail.storeId, previousState);
    } catch (error) {
      // 실패 시 복구
      setStoreDetail({ ...storeDetail, isBookmark: previousState });
      console.error("북마크 변경에 실패했습니다:", error);
    }
  };

  return { storeDetail, menus, handleBookmarkToggle };
};
