import { useMemo } from "react";
import { Animated, Dimensions, ScrollView } from "react-native";
import { Images } from "@/shared/assets/images";
import { CarouselIndicator } from "@/shared/ui/CarouselIndicator";
import { RootStackParamList } from "@/app/config/routes/routes.core";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMyWaitings } from "../hooks/useMyWaitings";
import { useWaitingCarousel } from "../hooks/useWaitingCarousel";
import { NoneWaitingSection } from "./NoneWaiting";
import { GlassCard } from "./GlassCard";
import { WaitingCard } from "./WaitingCard";
import styled from "@emotion/native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_HEIGHT = 145;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const CAROUSEL_CONTENT_STYLE = {
  width: "100%" as const,
  alignItems: "center" as const,
};

interface MyWaitingSectionProps {
  onPressFind?: () => void;
}

interface WaitingItem {
  type: "waiting";
  storeName: string;
  teamsAhead: number;
  profileImageUrl: string;
}

type NoneItem = { type: "none" };

export const MyWaitingSection = ({
  onPressFind,
}: MyWaitingSectionProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { waitings, refetch } = useMyWaitings();

  const reservations = useMemo<WaitingItem[]>(
    () =>
      waitings.slice(0, 3).map((w) => ({ ...w, type: "waiting" })),
    [waitings],
  );

  const carouselItems = useMemo<(WaitingItem | NoneItem)[]>(() => {
    if (reservations.length < 3) {
      return [...reservations, { type: "none" }];
    }
    return reservations;
  }, [reservations]);

  const {
    activeIndex,
    scrollY,
    scrollRef,
    loopedItems,
    handleScrollEnd,
    onScroll,
  } = useWaitingCarousel(carouselItems, CARD_HEIGHT);

  const indicatorIndex = Math.min(activeIndex, reservations.length - 1);

  const isNoneActive =
    reservations.length < 3 && activeIndex === reservations.length;

  return (
    <E.Section>
      {/* 배경 그림자 이미지 */}
      {reservations.length > 0 && !isNoneActive && (
        <E.BgShadow source={Images["bg-shadow"]} resizeMode="stretch" />
      )}

      {reservations.length === 0 ? (
        <GlassCard>
          <NoneWaitingSection variant="empty" onPressFind={onPressFind} />
        </GlassCard>
      ) : (
        <E.RowContainer>
          {/* 대기 정보 카드 캐러셀 */}
          <GlassCard>
            <E.Carousel
              ref={scrollRef}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
              pagingEnabled
              snapToInterval={CARD_HEIGHT}
              decelerationRate="fast"
              onMomentumScrollEnd={handleScrollEnd}
              contentContainerStyle={CAROUSEL_CONTENT_STYLE}
              onScroll={onScroll}
              scrollEventThrottle={16}
            >
              {loopedItems.map((item, index) => {
                const inputRange = [
                  (index - 1) * CARD_HEIGHT,
                  index * CARD_HEIGHT,
                  (index + 1) * CARD_HEIGHT,
                ];
                const scale = scrollY.interpolate({
                  inputRange,
                  outputRange: [0.92, 1, 0.92],
                  extrapolate: "clamp",
                });

                return (
                  <E.CardPage
                    key={`${item.type === "waiting" ? item.storeName : "none"}-${index}`}
                  >
                    <Animated.View
                      style={{ width: "100%", transform: [{ scale }] }}
                    >
                      {item.type === "none" ? (
                        <NoneWaitingSection variant="limit" onPressFind={onPressFind} />
                      ) : (
                        <WaitingCard
                          storeName={item.storeName}
                          teamsAhead={item.teamsAhead}
                          profileImageUrl={item.profileImageUrl}
                          onRefresh={refetch}
                          onPress={() => navigation.navigate("WaitingDetail")}
                        />
                      )}
                    </Animated.View>
                  </E.CardPage>
                );
              })}
            </E.Carousel>
          </GlassCard>

          {/* 캐러셀 인디케이터 */}
          <E.IndicatorContainer pointerEvents="none">
            <CarouselIndicator
              total={reservations.length}
              activeIndex={indicatorIndex}
              direction="column"
            />
          </E.IndicatorContainer>
        </E.RowContainer>
      )}
    </E.Section>
  );
};

const E = {
  Section: styled.View({
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "visible",
  }),

  BgShadow: styled.Image({
    position: "absolute",
    width: SCREEN_WIDTH,
    height: 150,
    alignSelf: "center",
    zIndex: 0,
  }),

  RowContainer: styled.View({
    width: "100%",
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  }),

  Carousel: styled(AnimatedScrollView)({
    width: "100%",
    height: CARD_HEIGHT,
  }),

  CardPage: styled.View({
    width: "100%",
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  }),

  IndicatorContainer: styled.View({
    position: "absolute",
    right: -12,
    top: 0,
    bottom: 0,
    width: 12,
    justifyContent: "center",
    alignItems: "center",
  }),
};
