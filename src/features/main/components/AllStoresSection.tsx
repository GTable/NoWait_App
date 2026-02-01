import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { StoreComponent } from "@/shared/ui/StoreComponent";
import styled from "@emotion/native";
import React from "react";

// 목업 데이터
const MOCK_STORES = [
  {
    publicCode: "store1",
    name: "술술 주점",
    departmentName: "컴퓨터공학과",
    storeLogoUrl: undefined,
    isActive: true,
    waitingCount: 0,
  },
  {
    publicCode: "store2",
    name: "신나는 포차",
    departmentName: "경영학과",
    storeLogoUrl: undefined,
    isActive: true,
    waitingCount: 3,
  },
  {
    publicCode: "store3",
    name: "달빛 주점",
    departmentName: "디자인학과",
    storeLogoUrl: undefined,
    isActive: false,
    waitingCount: 0,
  },
  {
    publicCode: "store4",
    name: "행복한 술집",
    departmentName: "전자공학과",
    storeLogoUrl: undefined,
    isActive: true,
    waitingCount: 5,
  },
  {
    publicCode: "store5",
    name: "별빛 포차",
    departmentName: "건축학과",
    storeLogoUrl: undefined,
    isActive: true,
    waitingCount: 1,
  },
  {
    publicCode: "store6",
    name: "동물의 숲 주점",
    departmentName: "생명과학과",
    storeLogoUrl: undefined,
    isActive: true,
    waitingCount: 2,
  },
];

export const AllStoresSection = () => {
  return (
    <E.Container>
      <E.SectionTitle>모든 주점</E.SectionTitle>

      {/* 주점 목록 */}
      {MOCK_STORES.map((store) => (
        <StoreComponent
          key={store.publicCode}
          publicCode={store.publicCode}
          name={store.name}
          departmentName={store.departmentName}
          storeLogoUrl={store.storeLogoUrl}
          isActive={store.isActive}
          waitingCount={store.waitingCount}
        />
      ))}
    </E.Container>
  );
};

const E = {
  Container: styled.View({
    flex: 1,
    gap: 12,
  }),

  SectionTitle: styled.Text({
    color: colors.black[90],
    ...typography["title-20-bold"],
    paddingHorizontal: 20,
  }),
};
