import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllStores } from "../model/AllStoresApi";

/**
 * 모든 주점 목록을 무한 스크롤로 조회하는 커스텀 훅
 *
 * - 30초마다 자동으로 최신 데이터 갱신
 * - 페이지네이션 지원 (한 페이지당 20개)
 * - 스크롤 끝에 도달하면 다음 페이지 자동 로드
 */
export const useAllStores = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["allStores"],
      queryFn: ({ pageParam = 0 }) => getAllStores(pageParam, 20),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.hasNext ? allPages.length : undefined;
      },
      initialPageParam: 0,
      refetchInterval: 30000, // 30초마다 자동 리패치
      staleTime: 0, // 항상 최신 데이터 요청
    });

  const stores = data?.pages.flatMap((page) => page.stores) ?? [];

  return {
    stores,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
};
