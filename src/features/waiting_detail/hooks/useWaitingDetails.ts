import { useQuery } from "@tanstack/react-query";
import {
  getWaitingDetails,
  WaitingDetailItem,
} from "../model/WaitingDetailApi";

/**
 * 나의 대기 상세 목록 조회 훅
 * - 초기 데이터로 즉시 렌더링 후, 마운트 시 1회 동기화한다.
 */
export const useWaitingDetails = (initialData?: WaitingDetailItem[]) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["waitingDetails"],
    queryFn: getWaitingDetails,
    initialData,
    refetchOnMount: true,
    staleTime: 0,
  });

  return {
    waitingDetails: data ?? [],
    isLoading,
    refetch,
  };
};
