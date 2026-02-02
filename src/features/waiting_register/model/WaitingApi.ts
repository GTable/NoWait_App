import { getStoreDetail } from "@/features/store_detail/model/StoreDetailApi";

export interface WaitingInfo {
  waitingCount: number;
  boothName: string;
}

/**
 * 대기 등록 확인용 주점 정보 조회
 * @param publicCode - 주점 공개 코드
 * @returns 현재 대기 팀 수 및 "주점명 / 학과명" 형태의 부스 이름
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
