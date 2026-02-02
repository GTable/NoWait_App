import { useEffect, useState } from "react";
import {
  loadRecentSearches,
  saveRecentSearches,
} from "../model/recentSearchStorage";

const MAX_RECENT_SEARCHES = 10;

interface RecentSearch {
  publicCode: string;
  name: string;
}

interface UseRecentSearchesResult {
  recentSearches: RecentSearch[];
  addRecentSearch: (item: RecentSearch) => void;
  removeRecentSearch: (publicCode: string) => void;
}

/**
 * 최근 검색어 관리 훅
 * - AsyncStorage에서 최근 검색어 로드/저장
 * - 최대 10개까지 저장
 * - 중복 검색어는 맨 앞으로 이동
 */
export const useRecentSearches = (): UseRecentSearchesResult => {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    let cancelled = false;

    loadRecentSearches()
      .then((loaded) => {
        if (cancelled) {
          return;
        }
        setRecentSearches((prev) => {
          // 늦게 도착한 로드 결과가 로컬 업데이트를 덮어쓰지 않도록 병합
          if (prev.length === 0) {
            return loaded;
          }
          const merged = [
            ...prev,
            ...loaded.filter(
              (item) =>
                !prev.some((entry) => entry.publicCode === item.publicCode),
            ),
          ].slice(0, MAX_RECENT_SEARCHES);
          saveRecentSearches(merged).catch((error) => {
            console.error("Save recent searches failed:", error);
          });
          return merged;
        });
      })
      .catch((error) => {
        console.error("Load recent searches failed:", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const addRecentSearch = (item: RecentSearch) => {
    setRecentSearches((prev) => {
      const next = [
        item,
        ...prev.filter((entry) => entry.publicCode !== item.publicCode),
      ].slice(0, MAX_RECENT_SEARCHES);
      saveRecentSearches(next).catch((error) => {
        console.error("Save recent searches failed:", error);
      });
      return next;
    });
  };

  const removeRecentSearch = (publicCode: string) => {
    setRecentSearches((prev) => {
      const next = prev.filter((entry) => entry.publicCode !== publicCode);
      saveRecentSearches(next).catch((error) => {
        console.error("Save recent searches failed:", error);
      });
      return next;
    });
  };

  return { recentSearches, addRecentSearch, removeRecentSearch };
};
