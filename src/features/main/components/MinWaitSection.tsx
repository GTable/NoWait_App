import { ArrowDown } from "@/shared/assets/images";
import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import styled from "@emotion/native";
import React from "react";
import { BoothCard } from "./BoothCard";
import { SortModal } from "./SortModal";
import { SortOption } from "@/screens/main/MainScreen";

// 목업 데이터
const MOCK_DATA = [
  {
    id: 1,
    boothName: "술술 주점",
    departmentName: "컴퓨터공학과",
    waitingCount: 0,
    bannerImages: undefined,
    profileImage: undefined,
  },
  {
    id: 2,
    boothName: "신나는 포차",
    departmentName: "경영학과",
    waitingCount: 3,
    bannerImages: undefined,
    profileImage: undefined,
  },
  {
    id: 3,
    boothName: "달빛 주점",
    departmentName: "디자인학과",
    waitingCount: 0,
    bannerImages: undefined,
    profileImage: undefined,
  },
  {
    id: 4,
    boothName: "행복한 술집",
    departmentName: "전자공학과",
    waitingCount: 5,
    bannerImages: undefined,
    profileImage: undefined,
  },
  {
    id: 5,
    boothName: "별빛 포차",
    departmentName: "건축학과",
    waitingCount: 1,
    bannerImages: undefined,
    profileImage: undefined,
  },
];

interface MinWaitSectionProps {
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

export const MinWaitSection = ({
  isModalVisible,
  setIsModalVisible,
  sortOption,
  setSortOption,
}: MinWaitSectionProps) => {
  const sectionTitle =
    sortOption === "minWait" ? "대기가 가장 적어요" : "인기가 가장 많아요";

  return (
    <E.Container>
      <E.TitleSection onPress={() => setIsModalVisible(true)}>
        <E.SectionTitle>{sectionTitle}</E.SectionTitle>
        <E.DropdownButton>
          <ArrowDown />
        </E.DropdownButton>
      </E.TitleSection>

      {/* 부스 카드 가로 스크롤 리스트 */}
      <E.HorizontalCardList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 6 }}
      >
        {MOCK_DATA.map((item) => (
          <BoothCard
            key={item.id}
            name={item.boothName}
            departmentName={item.departmentName}
            waitingCount={item.waitingCount}
            bannerImages={item.bannerImages}
            profileImage={item.profileImage}
          />
        ))}
      </E.HorizontalCardList>

      {/* 하단 모달 */}
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
};
