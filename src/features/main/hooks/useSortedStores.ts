import { useQuery } from "@tanstack/react-query";
import { getSortedStores } from "../model/SortedStoresApi";
import { SortOption } from "@/screens/main/MainScreen";

/**
 * 정렬된 주점 목록 조회 커스텀 훅 (상위 5개)
 *
 * @param sortOption - 정렬 기준 ("asc": 대기 적은 순, "desc": 인기 순)
 *
 * - 30초마다 자동으로 최신 데이터 갱신
 * - sortOption 변경 시 자동으로 새 데이터 요청
 */
export const useSortedStores = (sortOption: SortOption) => {
  const { data, isLoading } = useQuery({
    queryKey: ["sortedStores", sortOption],
    queryFn: () => getSortedStores(sortOption),
    refetchInterval: 30000, // 30초마다 자동 리패치
    staleTime: 0, // 항상 최신 데이터 요청
  });

  return {
    stores: data ?? [],
    isLoading,
  };
};
