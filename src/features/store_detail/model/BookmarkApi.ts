import { usersApi } from "@/shared/api/usersApi";
import { z } from "zod";

// 성공 응답만 검증 (실패는 interceptor에서 처리)
const SuccessResponseSchema = z.object({
  success: z.boolean(),
});

/**
 * 북마크 토글 API
 * - 북마크가 없으면 생성, 있으면 삭제
 * @param storeId - 주점 ID
 * @param isCurrentlyBookmarked - 현재 북마크 상태
 */
export const toggleBookmark = async (
  storeId: number,
  isCurrentlyBookmarked: boolean,
): Promise<void> => {
  if (isCurrentlyBookmarked) {
    // 삭제
    const response = await usersApi.delete(`/bookmarks/${storeId}`);
    SuccessResponseSchema.parse(response);
  } else {
    // 생성
    const response = await usersApi.post(`/bookmarks/${storeId}`);
    SuccessResponseSchema.parse(response);
  }
};
