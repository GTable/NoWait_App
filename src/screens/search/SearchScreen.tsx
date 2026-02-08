import { ScreenLayout } from "@/app/layout/ScreenLayout";
import { SearchComponents } from "@/features/search/components/SearchComponents";
import { RecentSearchComponent } from "@/features/search/components/RecentSearchComponent";
import styled from "@emotion/native";
import React, { useState } from "react";
import { SearchResultComponent } from "@/features/search/components/SearchResultComponent";
import { Keyboard, Pressable } from "react-native";
import { useSearchStores } from "@/features/search/hooks/useSearchStores";
import { useRecentSearches } from "@/features/search/hooks/useRecentSearches";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/config/routes/routes.core";

const SearchScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
            onClose={() => navigation.goBack()}
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
