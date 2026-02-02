import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { StoreComponent } from "@/shared/ui/StoreComponent";
import styled from "@emotion/native";
import React from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useAllStores } from "../hooks/useAllStores";

/**
 * 메인 화면의 "모든 주점" 섹션 컴포넌트
 *
 * - 무한 스크롤 지원 (스크롤 끝에서 자동 로드)
 * - 실시간 데이터 갱신 (30초마다)
 */
export const AllStoresSection = () => {
  const { stores, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useAllStores();

  return (
    <E.Container>
      <E.SectionTitle>모든 주점</E.SectionTitle>

      {isLoading ? (
        <E.LoadingContainer>
          <ActivityIndicator size="large" color={colors.primary[50]} />
        </E.LoadingContainer>
      ) : (
        <FlatList
          data={stores}
          keyExtractor={(item) => `${item.storeId}`}
          renderItem={({ item }) => <StoreComponent {...item} />}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <E.LoadingMoreContainer>
                <ActivityIndicator size="small" color={colors.primary[50]} />
              </E.LoadingMoreContainer>
            ) : null
          }
          scrollEnabled={false}
        />
      )}
    </E.Container>
  );
};

const E = {
  Container: styled.View({
    flex: 1,
    gap: 12,
    // 하단에 붙어 있는 경우 클릭하기 어려워 보이는 문제 방지
    paddingBottom: 90,
  }),

  SectionTitle: styled.Text({
    color: colors.black[90],
    ...typography["title-20-bold"],
    paddingHorizontal: 20,
  }),

  LoadingContainer: styled.View({
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  }),

  LoadingMoreContainer: styled.View({
    width: "100%",
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  }),
};
