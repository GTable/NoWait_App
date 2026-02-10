import { useQuery } from "@tanstack/react-query";
import { getMyWaitings } from "../model/MyWaitingApi";

/**
 * 나의 대기 목록 조회 훅
 * - 30초마다 자동 갱신
 */
export const useMyWaitings = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["myWaitings"],
    queryFn: getMyWaitings,
    refetchInterval: 30000,
    staleTime: 0,
  });

  return {
    waitings: data ?? [],
    isLoading,
    refetch,
  };
};
