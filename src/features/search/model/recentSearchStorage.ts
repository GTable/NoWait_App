import AsyncStorage from "@react-native-async-storage/async-storage";

// 최근 검색어 저장 키
const RECENT_SEARCHES_KEY = "recentSearches";

export interface RecentSearchItem {
  publicCode: string;
  name: string;
}

// 저장된 항목의 형태를 검사하는 타입 가드
const isRecentSearchItem = (item: unknown): item is RecentSearchItem => {
  if (!item || typeof item !== "object") {
    return false;
  }

  const candidate = item as { publicCode?: unknown; name?: unknown };
  return typeof candidate.publicCode === "string" && typeof candidate.name === "string";
};

// 최근 검색어 목록을 불러옴
export const loadRecentSearches = async (): Promise<RecentSearchItem[]> => {
  const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isRecentSearchItem);
  } catch {
    return [];
  }
};

// 최근 검색어 목록을 저장함
export const saveRecentSearches = async (
  items: RecentSearchItem[]
): Promise<void> => {
  await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(items));
};
