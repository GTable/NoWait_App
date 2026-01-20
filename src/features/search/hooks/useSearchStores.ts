import { useEffect, useState } from "react";
import { searchStores, SearchStore } from "../model/SearchApi";

interface UseSearchStoresResult {
  results: SearchStore[];
  hasSearched: boolean;
}

// 검색어 입력에 맞춰 검색 결과를 가져오는 훅
export const useSearchStores = (keyword: string): UseSearchStoresResult => {
  const [results, setResults] = useState<SearchStore[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const trimmedKeyword = keyword.trim();

    // 빈 검색어면 결과를 초기화하고 API 호출을 막는다.
    if (!trimmedKeyword) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    let isCanceled = false;
    setResults([]);
    setHasSearched(false);

    searchStores(trimmedKeyword)
      .then((stores) => {
        if (isCanceled) {
          return;
        }
        setResults(stores);
      })
      .catch((error) => {
        console.error("Search failed:", error);
        if (isCanceled) {
          return;
        }
        setResults([]);
      })
      .finally(() => {
        if (!isCanceled) {
          setHasSearched(true);
        }
      });

    return () => {
      // 이전 요청의 결과가 뒤늦게 도착해도 상태 갱신을 막는다.
      isCanceled = true;
    };
  }, [keyword]);

  return { results, hasSearched };
};
