import styled from "@emotion/native";
import { Images } from "@/shared/assets/images";
import { CarouselIndicator } from "@/shared/ui/CarouselIndicator";
import React, { useState, useRef } from "react";
import { FlatList, ViewToken, useWindowDimensions } from "react-native";

const ONBOARD_IMAGES = [
  Images["onboard-1"],
  Images["onboard-2"],
  Images["onboard-3"],
] as const;

/**
 * 온보딩 화면의 이미지 슬라이더 컴포넌트
 * - 3개의 온보딩 이미지를 가로로 스와이프
 * - 현재 페이지 인디케이터 표시
 */
export const OnboardSlide = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowDimensions();

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <E.Container>
      <E.FlatListWrapper>
        <FlatList
          data={ONBOARD_IMAGES}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <E.ImageWrapper width={width}>
              <E.Image source={item} />
            </E.ImageWrapper>
          )}
        />
      </E.FlatListWrapper>
      <CarouselIndicator total={3} activeIndex={activeIndex} />
    </E.Container>
  );
};

const E = {
  Container: styled.View({
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 36,
  }),

  FlatListWrapper: styled.View({
    width: "100%",
  }),

  ImageWrapper: styled.View<{ width: number }>(({ width }) => ({
    width: width,
    justifyContent: "center",
    alignItems: "center",
  })),

  Image: styled.Image({
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  }),
};
