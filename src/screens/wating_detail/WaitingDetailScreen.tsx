import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenLayout } from "@/app/layout/ScreenLayout";
import { RootStackParamList } from "@/app/config/routes/routes.core";
import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { WaitingCancelButton } from "@/features/waiting_detail/components/WaitingCancelButton";
import { WaitingDetailCarousel } from "@/features/waiting_detail/components/WaitingDetailCarousel";
import { useWaitingDetailCarousel } from "@/features/waiting_detail/hooks/useWaitingDetailCarousel";
import { MOCK_WAITING_DETAILS } from "@/features/waiting_detail/model/WaitingDetailModel";
import { BackHeader } from "@/shared/ui/BackHeader";
import styled from "@emotion/native";

type WaitingDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "WaitingDetail"
>;

const WaitingDetailScreen = () => {
  const navigation = useNavigation<WaitingDetailNavigationProp>();
  const {
    scrollX,
    activeIndex,
    snapInterval,
    cardWidth,
    cardGap,
    handleScroll,
    handleScrollEnd,
  } = useWaitingDetailCarousel(MOCK_WAITING_DETAILS);
  const teamsAhead = MOCK_WAITING_DETAILS[activeIndex]?.teamsAhead ?? 0;

  const handleCancelWaiting = () => {
    navigation.goBack();
  };

  return (
    <ScreenLayout>
      {/* 상단 뒤로가기 헤더 */}
      <BackHeader onPress={() => navigation.goBack()} />

      <E.Container>
        {/* 대기 상태 요약 영역 */}
        <E.WaitingHeaderContainer>
          <E.WaitingStatusText>입장 대기 중</E.WaitingStatusText>
          <E.WaitingSummaryText>
            내 앞 대기{" "}
            <E.WaitingCountText>
              <E.WaitingCountNumber>{teamsAhead}</E.WaitingCountNumber>
              팀
            </E.WaitingCountText>
          </E.WaitingSummaryText>
        </E.WaitingHeaderContainer>

        <E.WaitingCardSection>
          {/* 대기 상세 카드 캐러셀 */}
          <WaitingDetailCarousel
            items={MOCK_WAITING_DETAILS}
            cardWidth={cardWidth}
            cardGap={cardGap}
            snapInterval={snapInterval}
            scrollX={scrollX}
            onScroll={handleScroll}
            onScrollEnd={handleScrollEnd}
          />

          {/* 대기 취소 액션 버튼 */}
          <WaitingCancelButton onPress={handleCancelWaiting} />
        </E.WaitingCardSection>
      </E.Container>
    </ScreenLayout>
  );
};

export default WaitingDetailScreen;

const E = {
  Container: styled.View({
    flex: 1,
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 14,
    gap: 35,
  }),

  WaitingHeaderContainer: styled.View({
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    justifyContent: "center",
  }),

  WaitingStatusText: styled.Text({
    color: colors.black[100],
    textAlign: "center",
    ...typography["text-16-medium"],
    opacity: 0.5,
  }),

  WaitingSummaryText: styled.Text({
    color: colors.black[80],
    textAlign: "center",
    ...typography["headline-22-bold"],
  }),

  WaitingCountText: styled.Text({
    color: colors.primary,
  }),

  WaitingCountNumber: styled.Text({
    fontVariant: ["tabular-nums"],
    minWidth: 24,
    textAlign: "right",
  }),

  WaitingCardSection: styled.View({
    width: "100%",
    flexDirection: "column",
    gap: 60.5,
  }),
};
