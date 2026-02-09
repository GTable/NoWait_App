import { ScreenLayout } from "@/app/layout/ScreenLayout";
import styled from "@emotion/native";
import React, { useState } from "react";
import { Header } from "@/features/main/components/Header";
import { SortedStoresSection } from "@/features/main/components/SortedStoresSection";
import { AllStoresSection } from "@/features/main/components/AllStoresSection";
import { useModal } from "@/shared/contexts/ModalContext";
import { SortOption } from "@/features/main/model/SortedStoresApi";

const MainScreen = () => {
  const { showModal, hideModal } = useModal();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("desc");

  const handleOpenModal = () => {
    setIsModalVisible(true);
    showModal();
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    hideModal();
  };

  return (
    <ScreenLayout bottomSafeArea={false}>
      {/* 상단 헤더 */}
      <Header />

      {/* 메인 컨텐츠 영역 */}
      <E.ScrollContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 50 }}
      >
        <SortedStoresSection
          isModalVisible={isModalVisible}
          onOpenModal={handleOpenModal}
          onCloseModal={handleCloseModal}
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
    paddingTop: 20,
  }),
};
