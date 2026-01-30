import { getStoreDetail } from "@/features/store_detail/model/StoreDetailApi";

export interface WaitingInfo {
  waitingCount: number;
  boothName: string;
}

/**
 * 대기 등록 확인 화면에 필요한 주점 정보 조회
 * - waitingCount: 현재 대기 중인 팀 수
 * - boothName: "주점명 / 학과명" 형태
 */
export const getWaitingInfo = async (
  publicCode: string,
): Promise<WaitingInfo | null> => {
  const storeDetail = await getStoreDetail(publicCode);

  if (!storeDetail) {
    return null;
  }

  return {
    waitingCount: storeDetail.waitingCount,
    boothName: `${storeDetail.name} / ${storeDetail.departmentName}`,
  };
};
