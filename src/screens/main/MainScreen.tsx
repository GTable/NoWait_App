import { ScreenLayout } from "@/app/layout/ScreenLayout";
import styled from "@emotion/native";
import React, { useRef, useState } from "react";
import { Header } from "@/features/main/components/Header";
import { SortedStoresSection } from "@/features/main/components/SortedStoresSection";
import { AllStoresSection } from "@/features/main/components/AllStoresSection";
import { useModal } from "@/shared/contexts/ModalContext";
import { SortOption } from "@/features/main/model/SortedStoresApi";
import { MyWaitingSection } from "@/features/main/components/MyWaitingSection";
import { ScrollView } from "react-native";

const MainScreen = () => {
  const { showModal, hideModal } = useModal();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("desc");
  const scrollRef = useRef<ScrollView>(null);
  const [allStoresY, setAllStoresY] = useState(0);

  const handleOpenModal = () => {
    setIsModalVisible(true);
    showModal();
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    hideModal();
  };

  const handleScrollToAllStores = () => {
    scrollRef.current?.scrollTo({ y: allStoresY, animated: true });
  };

  return (
    <ScreenLayout bottomSafeArea={false}>
      {/* 상단 헤더 */}
      <Header />

      {/* 메인 컨텐츠 영역 */}
      <E.ScrollContainer
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 50 }}
      >
        <MyWaitingSection onPressFind={handleScrollToAllStores} />

        <SortedStoresSection
          isModalVisible={isModalVisible}
          onOpenModal={handleOpenModal}
          onCloseModal={handleCloseModal}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        <E.AllStoresWrapper
          onLayout={(event) => setAllStoresY(event.nativeEvent.layout.y)}
        >
          <AllStoresSection />
        </E.AllStoresWrapper>
      </E.ScrollContainer>
    </ScreenLayout>
  );
};

export default MainScreen;

const E = {
  ScrollContainer: styled.ScrollView({
    flex: 1,
    paddingTop: 10,
  }),
  AllStoresWrapper: styled.View({}),
};
