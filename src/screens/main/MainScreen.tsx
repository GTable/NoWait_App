import { ScreenLayout } from "@/app/layout/ScreenLayout";
import styled from "@emotion/native";
import React, { useState } from "react";
import { colors } from "@/app/styles/colors";
import { Header } from "../../features/main/components/Header";
import { MinWaitSection } from "@/features/main/components/MinWaitSection";
import { AllStoresSection } from "@/features/main/components/AllStoresSection";

export type SortOption = "minWait" | "popular";

const MainScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("popular");

  return (
    <ScreenLayout bottomSafeArea={false}>
      {/* 배경 오버레이 */}
      {isModalVisible && <E.BackgroundOverlay />}

      {/* 상단 헤더 */}
      <Header />

      {/* 메인 컨텐츠 영역 */}
      <E.ScrollContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 50 }}
      >
        <E.BannerPlaceholder />

        <MinWaitSection
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
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
  BackgroundOverlay: styled.View({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1,
  }),

  ScrollContainer: styled.ScrollView({
    flex: 1,
  }),

  BannerPlaceholder: styled.View({
    height: 150,
    backgroundColor: colors.black[60],
  }),
};
