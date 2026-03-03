import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";
import { MyWaitingCard } from "./MyWaitingCard";
import { WaitingDetailItem } from "../model/WaitingDetailApi";
import styled from "@emotion/native";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

interface WaitingDetailCarouselProps {
  items: WaitingDetailItem[];
  cardWidth: number;
  cardGap: number;
  snapInterval: number;
  initialIndex: number;
  scrollEnabled?: boolean;
  scrollX: Animated.Value;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

/**
 * 대기 상세 카드를 가로 스와이프로 보여주는 캐러셀 컴포넌트.
 */
export const WaitingDetailCarousel = ({
  items,
  cardWidth,
  cardGap,
  snapInterval,
  initialIndex,
  scrollEnabled = true,
  scrollX,
  onScroll,
  onScrollEnd,
}: WaitingDetailCarouselProps) => {
  const contentStyle = {
    paddingHorizontal: 54,
    paddingVertical: 8,
    gap: cardGap,
  };

  return (
    <E.HorizontalWaitingCardList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={contentStyle}
      snapToInterval={snapInterval}
      contentOffset={{ x: initialIndex * snapInterval, y: 0 }}
      scrollEnabled={scrollEnabled}
      decelerationRate="fast"
      disableIntervalMomentum
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true, listener: onScroll },
      )}
      scrollEventThrottle={16}
      onMomentumScrollEnd={onScrollEnd}
    >
      {items.map((waitingDetail, index) => {
        const inputRange = [
          (index - 1) * snapInterval,
          index * snapInterval,
          (index + 1) * snapInterval,
        ];
        const rotate = scrollX.interpolate({
          inputRange,
          outputRange: ["3deg", "0deg", "-3deg"],
          extrapolate: "clamp",
        });
        const translateY = scrollX.interpolate({
          inputRange,
          outputRange: [10, 0, 10],
          extrapolate: "clamp",
        });

        return (
          <E.WaitingCardItem
            key={`${waitingDetail.card.publicCode}-${waitingDetail.card.waitingNumber}-${waitingDetail.card.registeredAt}`}
            style={{ width: cardWidth }}
          >
            {/* 포커스 카드 강조를 위한 tilt/translate 애니메이션 */}
            <Animated.View
              style={{ width: "100%", transform: [{ rotate }, { translateY }] }}
            >
              <MyWaitingCard data={waitingDetail.card} />
            </Animated.View>
          </E.WaitingCardItem>
        );
      })}
    </E.HorizontalWaitingCardList>
  );
};

const E = {
  HorizontalWaitingCardList: styled(AnimatedScrollView)({
    width: "100%",
    overflow: "visible",
  }),

  WaitingCardItem: styled.View({}),
};
