import { useEffect, useState } from "react";
import { loadRecentSearches, saveRecentSearches } from "../model/recentSearchStorage";
import { RecentSearchItem } from "../types";

const MAX_RECENT_SEARCHES = 10;

interface UseRecentSearchesResult {
  recentSearches: RecentSearchItem[];
  addRecentSearch: (item: RecentSearchItem) => void;
  removeRecentSearch: (publicCode: string) => void;
}

export const useRecentSearches = (): UseRecentSearchesResult => {
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);

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
              (item) => !prev.some((entry) => entry.publicCode === item.publicCode),
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

  const addRecentSearch = (item: RecentSearchItem) => {
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
