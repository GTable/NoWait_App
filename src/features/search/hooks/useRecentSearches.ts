import { useEffect, useState } from "react";
import {
  loadRecentSearches,
  RecentSearchItem,
  saveRecentSearches,
} from "../model/recentSearchStorage";

const MAX_RECENT_SEARCHES = 10;

interface UseRecentSearchesResult {
  recentSearches: RecentSearchItem[];
  addRecentSearch: (item: RecentSearchItem) => void;
  removeRecentSearch: (id: string) => void;
}

export const useRecentSearches = (): UseRecentSearchesResult => {
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);

  useEffect(() => {
    loadRecentSearches()
      .then(setRecentSearches)
      .catch((error) => {
        console.error("Load recent searches failed:", error);
      });
  }, []);

  const addRecentSearch = (item: RecentSearchItem) => {
    setRecentSearches((prev) => {
      const next = [item, ...prev.filter((entry) => entry.id !== item.id)].slice(
        0,
        MAX_RECENT_SEARCHES
      );
      saveRecentSearches(next).catch((error) => {
        console.error("Save recent searches failed:", error);
      });
      return next;
    });
  };

  const removeRecentSearch = (id: string) => {
    setRecentSearches((prev) => {
      const next = prev.filter((entry) => entry.id !== id);
      saveRecentSearches(next).catch((error) => {
        console.error("Save recent searches failed:", error);
      });
      return next;
    });
  };

  return { recentSearches, addRecentSearch, removeRecentSearch };
};
