import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/app/styles/colors";
import { ReloadSvg } from "@/shared/assets/images";
import styled from "@emotion/native";

interface WaitingCardProps {
  storeName: string;
  teamsAhead: number;
  profileImageUrl: string;
  onRefresh: () => void;
  onPress?: () => void;
}

export const WaitingCard = ({
  storeName,
  teamsAhead,
  profileImageUrl,
  onRefresh,
  onPress,
}: WaitingCardProps) => {
  return (
    <E.Container
      colors={["#FF561E", "#FF7D52"]}
      start={{ x: 0.1292, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <E.ContentArea onPress={onPress}>
        {/* 상단: 나의 대기 + 부스 아이콘 */}
        <E.TopRow>
          <E.SectionLabel>나의 대기</E.SectionLabel>
          <E.BoothIcon source={{ uri: profileImageUrl }} />
        </E.TopRow>

        {/* 하단: 주점명 + 대기 팀 수 */}
        <E.BottomRow>
          <E.StoreName>{storeName}</E.StoreName>

          <E.TeamInfo>
            <E.TeamText>
              내 앞 <E.TeamCount>{teamsAhead}팀</E.TeamCount>
            </E.TeamText>

            <E.ReloadButton onPress={onRefresh} hitSlop={8}>
              <ReloadSvg />
            </E.ReloadButton>
          </E.TeamInfo>
        </E.BottomRow>
      </E.ContentArea>
    </E.Container>
  );
};

const E = {
  Container: styled(LinearGradient)({
    width: "100%",
    paddingTop: 14,
    paddingRight: 14,
    paddingLeft: 18,
    paddingBottom: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.02)",
    height: 145,
  }),

  ContentArea: styled.Pressable({
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 30,
  }),

  TopRow: styled.View({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    alignSelf: "stretch",
  }),

  SectionLabel: styled.Text({
    color: "rgba(255, 255, 255, 0.90)",
    fontFamily: "Pretendard",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 21.6,
  }),

  BoothIcon: styled.Image({
    width: 30,
    height: 30,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.white[100],
  }),

  BottomRow: styled.View({
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 2,
  }),

  StoreName: styled.Text({
    color: colors.white[100],
    fontFamily: "Pretendard",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 21.6,
  }),

  TeamInfo: styled.View({
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  }),

  TeamText: styled.Text({
    color: "rgba(255, 255, 255, 0.80)",
    fontFamily: "Pretendard",
    fontSize: 22,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 28.6,
  }),

  ReloadButton: styled.Pressable({
    alignItems: "center",
    justifyContent: "center",
  }),

  TeamCount: styled.Text({
    color: colors.white[100],
    fontFamily: "Pretendard",
    fontSize: 22,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 28.6,
  }),
};
