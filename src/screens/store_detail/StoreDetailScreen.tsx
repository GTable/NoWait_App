import { ScreenLayout } from "@/app/layout/ScreenLayout";
import { colors } from "@/app/styles/colors";
import { MenuComponent } from "@/features/store_detail/components/MenuComponent";
import { StoreDetailInfoComponent } from "@/features/store_detail/components/StoreDetailInfoComponent";
import { useStoreDetail } from "@/features/store_detail/hooks/useStoreDetail";
import { CustomTwoButton } from "@/shared/ui/CustomTwoButton";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/config/routes/routes.core";
import styled from "@emotion/native";
import React from "react";
import { ScrollView } from "react-native";

type StoreDetailRouteProp = RouteProp<RootStackParamList, "StoreDetail">;

const StoreDetailScreen = () => {
  const route = useRoute<StoreDetailRouteProp>();
  const { publicCode } = route.params;

  const { storeDetail, menus } = useStoreDetail(publicCode);

  return (
    <ScreenLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 메인 이미지 영역 */}
        {storeDetail?.bannerImageUrls[0] ? (
          <E.MainImage source={{ uri: storeDetail.bannerImageUrls[0] }} />
        ) : (
          <E.MainImagePlaceholder />
        )}

        <E.Layout>
          {/* 주점 상세 정보 영역 */}
          {storeDetail && <StoreDetailInfoComponent {...storeDetail} />}

          {/* 메뉴 영역 */}
          <MenuComponent menus={menus} />
        </E.Layout>
      </ScrollView>

      {/* 하단 고정 버튼 */}
      <E.BottomButtonWrapper>
        <CustomTwoButton
          isBookmark={storeDetail?.isBookmark}
          isActive={storeDetail?.isActive}
          isWaiting={storeDetail?.isWaiting}
        />
      </E.BottomButtonWrapper>
    </ScreenLayout>
  );
};

export default StoreDetailScreen;

const E = {
  MainImage: styled.Image({
    width: "100%",
    height: 246,
  }),
  MainImagePlaceholder: styled.View({
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
