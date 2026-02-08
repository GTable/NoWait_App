import { ScreenLayout } from "@/app/layout/ScreenLayout";
import styled from "@emotion/native";
import React, { useState } from "react";
import { colors } from "@/app/styles/colors";
import { Header } from "@/features/main/components/Header";
import { SortedStoresSection } from "@/features/main/components/SortedStoresSection";
import { AllStoresSection } from "@/features/main/components/AllStoresSection";
import { useModal } from "@/shared/contexts/ModalContext";

export type SortOption = "asc" | "desc";

const MainScreen = () => {
  const { isModalVisible, showModal, hideModal } = useModal();
  const [sortOption, setSortOption] = useState<SortOption>("desc");

  return (
    <ScreenLayout bottomSafeArea={false}>
      {/* 상단 헤더 */}
      <Header />

      {/* 메인 컨텐츠 영역 */}
      <E.ScrollContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 50 }}
      >
        <E.BannerPlaceholder />

        <SortedStoresSection
          isModalVisible={isModalVisible}
          showModal={showModal}
          hideModal={hideModal}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        <AllStoresSection />
      </E.ScrollContainer>
    </ScreenLayout>
  );
};

export default MainScreen;

const E = {
  ScrollContainer: styled.ScrollView({
    flex: 1,
  }),

  BannerPlaceholder: styled.View({
    height: 150,
    backgroundColor: colors.black[60],
  }),
};
