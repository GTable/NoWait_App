import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { CancelSvg } from "@/shared/assets/images";
import styled from "@emotion/native";
import React from "react";
import { Pressable } from "react-native";
import { RecentSearchItem } from "@/features/search/model/recentSearchStorage";

interface RecentSearchComponentProps {
  recentSearches: RecentSearchItem[];
  onRemove?: (id: string) => void;
}

export const RecentSearchComponent = ({
  recentSearches,
  onRemove,
}: RecentSearchComponentProps) => {
  const hasRecentSearches = recentSearches.length > 0;

  return (
    <E.Container style={{ gap: hasRecentSearches ? 16 : 40 }}>
      <E.SectionTitle>최근 검색</E.SectionTitle>
      {hasRecentSearches ? (
        <E.SearchList>
          {recentSearches.map((search) => (
            <E.SearchItem key={search.id}>
              <E.SearchKeyword>{search.name}</E.SearchKeyword>
              {onRemove ? (
                <Pressable onPress={() => onRemove(search.id)}>
                  <CancelSvg width={16} height={16} />
                </Pressable>
              ) : (
                <CancelSvg width={16} height={16} />
              )}
            </E.SearchItem>
          ))}
        </E.SearchList>
      ) : (
        <E.EmptyMessage>최근검색어가 없습니다.</E.EmptyMessage>
      )}
    </E.Container>
  );
};

const E = {
  Container: styled.View({
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
  }),

  SectionTitle: styled.Text({
    fontFamily: "Pretendard",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 16 * 1.44,
    letterSpacing: -0.16,
    color: colors.black[90],
  }),

  SearchList: styled.View({
    width: "100%",
    flexDirection: "column",
    gap: 16,
  }),

  SearchItem: styled.View({
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
  }),

  SearchKeyword: styled.Text({
    ...typography["text-16-regular"],
    color: colors.black[90],
  }),

  EmptyMessage: styled.Text({
    width: "100%",
    textAlign: "center",
    ...typography["text-16-regular"],
    color: colors.black[50],
  }),
};
