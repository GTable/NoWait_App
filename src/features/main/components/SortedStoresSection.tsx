import { ArrowDown } from "@/shared/assets/images";
import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import styled from "@emotion/native";
import React from "react";
import { BoothCard } from "./BoothCard";
import { SortModal } from "./SortModal";
import { SortOption } from "@/screens/main/MainScreen";
import { ActivityIndicator } from "react-native";
import { useSortedStores } from "../hooks/useSortedStores";

/**
 * 메인 화면의 정렬된 주점 섹션 컴포넌트
 *
 * - 대기 적은 순 / 인기 순 정렬 지원
 * - 가로 스크롤 부스 카드 리스트
 * - 실시간 데이터 갱신 (30초마다)
 */
interface SortedStoresSectionProps {
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

export const SortedStoresSection = ({
  isModalVisible,
  setIsModalVisible,
  sortOption,
  setSortOption,
}: SortedStoresSectionProps) => {
  const { stores, isLoading } = useSortedStores(sortOption);

  const sectionTitle =
    sortOption === "asc" ? "대기가 가장 적어요" : "인기가 가장 많아요";

  return (
    <E.Container>
      {/* 정렬 옵션 선택 헤더 */}
      <E.TitleSection onPress={() => setIsModalVisible(true)}>
        <E.SectionTitle>{sectionTitle}</E.SectionTitle>
        <E.DropdownButton>
          <ArrowDown />
        </E.DropdownButton>
      </E.TitleSection>

      {/* 가로 스크롤 부스 카드 리스트 */}
      <E.HorizontalCardList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 6 }}
      >
        {isLoading ? (
          <E.LoadingContainer>
            <ActivityIndicator size="large" color={colors.primary[50]} />
          </E.LoadingContainer>
        ) : (
          stores.map((store) => (
            <BoothCard
              key={store.storeId}
              name={store.name}
              departmentName={store.departmentName}
              waitingCount={store.waitingCount}
              bannerImages={
                store.bannerImageUrl ? [store.bannerImageUrl] : undefined
              }
              profileImage={undefined}
            />
          ))
        )}
      </E.HorizontalCardList>

      {/* 정렬 옵션 선택 모달 */}
      <SortModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        currentSort={sortOption}
        onConfirm={(option) => {
          setSortOption(option);
          setIsModalVisible(false);
        }}
      />
    </E.Container>
  );
};

const E = {
  Container: styled.View({
    gap: 16,
    paddingHorizontal: 20,
  }),

  TitleSection: styled.TouchableOpacity({
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  }),

  SectionTitle: styled.Text({
    color: colors.black[90],
    ...typography["title-20-bold"],
  }),

  DropdownButton: styled.View({
    width: 24,
    height: 24,
  }),

  HorizontalCardList: styled.ScrollView({
    marginHorizontal: -20,
  }),

  LoadingContainer: styled.View({
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  }),
};
