import { ScreenLayout } from "@/app/layout/ScreenLayout";
import { colors } from "@/app/styles/colors";
import { MenuComponent } from "@/features/store_detail/components/MenuComponent";
import { StoreDetailInfoComponent } from "@/features/store_detail/components/StoreDetailInfoComponent";
import { CustomTwoButton } from "@/shared/ui/CustomTwoButton";
import styled from "@emotion/native";
import React from "react";
import { ScrollView } from "react-native";

const StoreDetailScreen = () => {
  return (
    <ScreenLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 메인 이미지 영역 */}
        <E.MainImage></E.MainImage>

        <E.Layout>
          {/* 주점 상세 정보 영역 */}
          <StoreDetailInfoComponent />

          {/* 메뉴 영역 */}
          <MenuComponent />
        </E.Layout>
      </ScrollView>

      {/* 하단 고정 버튼 */}
      <E.BottomButtonWrapper>
        <CustomTwoButton type="waiting" />
      </E.BottomButtonWrapper>
    </ScreenLayout>
  );
};

export default StoreDetailScreen;

const E = {
  MainImage: styled.View({
    width: "100%",
    height: 246,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black[60],
  }),
  Layout: styled.View({
    flex: 1,
    flexDirection: "column",
    gap: 12,
    backgroundColor: colors.black[10],
  }),
  BottomButtonWrapper: styled.View({
    backgroundColor: colors.white[100],
  }),
};
