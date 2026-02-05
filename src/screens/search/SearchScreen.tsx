import { ScreenLayout } from "@/app/layout/ScreenLayout";
import { SearchComponents } from "@/features/search/components/SearchComponents";
import { RecentSearchComponent } from "@/features/search/components/RecentSearchComponent";
import styled from "@emotion/native";
import React, { useState } from "react";
import { SearchResultComponent } from "@/features/search/components/SearchResultComponent";
import { Keyboard, Pressable } from "react-native";
import { useSearchStores } from "@/features/search/hooks/useSearchStores";
import { useRecentSearches } from "@/features/search/hooks/useRecentSearches";

/**
 * 검색 화면
 * - 검색어 입력 시: 검색 결과 표시
 * - 검색어 없을 때: 최근 검색어 표시
 */
const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const { results: searchResults, hasSearched } = useSearchStores(searchText);
  const { recentSearches, addRecentSearch, removeRecentSearch } =
    useRecentSearches();

  const handleStorePress = (publicCode: string, name: string) => {
    addRecentSearch({ publicCode, name });
  };

  return (
    <ScreenLayout>
      <Pressable
        style={{ flex: 1 }}
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <E.Container>
          <SearchComponents
            searchText={searchText}
            onSearchTextChange={setSearchText}
            onClose={() => setSearchText("")}
          />

          {searchText.trim() ? (
            <SearchResultComponent
              stores={searchResults}
              hasSearched={hasSearched}
              onStorePress={handleStorePress}
            />
          ) : (
            <RecentSearchComponent
              recentSearches={recentSearches}
              onRemove={removeRecentSearch}
            />
          )}
        </E.Container>
      </Pressable>
    </ScreenLayout>
  );
};

export default SearchScreen;

const E = {
  Container: styled.View({
    width: "100%",
    flexDirection: "column",
    gap: 40,
  }),
};
