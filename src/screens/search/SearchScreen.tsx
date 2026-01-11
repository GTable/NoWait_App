import { ScreenLayout } from "@/app/layout/ScreenLayout";
import { typography } from "@/app/styles/typography";
import { SearchComponents } from "@/features/search/components/SearchComponents";
import { RecentSearchComponent } from "@/features/search/components/RecentSearchComponent";
import styled from "@emotion/native";
import React, { useState } from "react";
import { SearchResultComponent } from "@/features/search/components/SearchResultComponent";

/**
 * 검색 화면
 * - 검색어 입력 시: 검색 결과 표시
 * - 검색어 없을 때: 최근 검색어 표시
 */
const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");

  // TODO: 실제 검색 결과 데이터로 교체 필요
  const mockSearchResults = [
    {
      id: "1",
      storeName: "컴공주점",
      department: "컴퓨터공학과",
      waitNumber: 15,
    },
    {
      id: "2",
      storeName: "경영대 주점",
      department: "경영학과",
      waitNumber: 8,
    },
    {
      id: "3",
      storeName: "공대 주점",
      department: "기계공학과",
    },
  ];

  const handleStorePress = (storeId: string) => {
    // TODO: 주점 상세 페이지로 이동
    console.log("Store pressed:", storeId);
  };

  return (
    <ScreenLayout>
      <E.Container>
        <SearchComponents
          searchText={searchText}
          onSearchTextChange={setSearchText}
          onClose={() => setSearchText("")}
        />

        {/* 검색어 입력 중일 때는 검색 결과, 아닐 때는 최근 검색어 표시 */}
        {searchText.trim() ? (
          <SearchResultComponent
            stores={mockSearchResults}
            onStorePress={handleStorePress}
          />
        ) : (
          <RecentSearchComponent />
        )}
      </E.Container>
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
