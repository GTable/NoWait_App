import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { Images } from "@/shared/assets/images";
import { WaitingCardData } from "../model/WaitingDetailApi";
import styled from "@emotion/native";

interface MyWaitingCardProps {
  data: WaitingCardData;
}

/**
 * 내 대기 상세 카드 UI
 * - 대기 번호, 매장 정보, 대기 상세 정보(인원/일시/위치)를 표시
 */
export const MyWaitingCard = ({ data }: MyWaitingCardProps) => {
  const {
    waitingNumber,
    storeName,
    departmentName,
    partySize,
    registeredAt,
    location,
    profileImageUrl,
  } = data;

  const waitingInfoItems = [
    { label: "인원", value: `${partySize}명` },
    { label: "일시", value: registeredAt },
    { label: "위치", value: location },
  ];

  return (
    <E.Root>
      {/* 카드 그림자 레이어 */}
      <E.CardShadow pointerEvents="none" />

      {/* 카드 배경 및 패턴 레이어 */}
      <E.CardBackground
        colors={["#FF561E", "#FF7D52"]}
        start={{ x: 0.1292, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <E.BackgroundPattern
          source={Images["pattern-img"]}
          resizeMode="stretch"
        />
        <E.CardContent>
          {/* 상단: 대기 번호와 프로필 이미지 */}
          <E.CardHeader>
            <E.QueueNumberText>#{waitingNumber}</E.QueueNumberText>
            <E.ProfileBadge source={{ uri: profileImageUrl }} />
          </E.CardHeader>

          <E.CardBody>
            {/* 매장 기본 정보 */}
            <E.StoreInfoSection>
              <E.StoreNameText numberOfLines={1} ellipsizeMode="tail">
                {storeName}
              </E.StoreNameText>
              <E.DepartmentText numberOfLines={1} ellipsizeMode="tail">
                {departmentName}
              </E.DepartmentText>
            </E.StoreInfoSection>

            {/* 대기 상세 정보 목록 */}
            <E.WaitingInfoSection>
              {waitingInfoItems.map((item) => (
                <E.WaitingInfoRow key={item.label}>
                  <E.WaitingInfoLabel>{item.label}</E.WaitingInfoLabel>
                  <E.WaitingInfoValue>{item.value}</E.WaitingInfoValue>
                </E.WaitingInfoRow>
              ))}
            </E.WaitingInfoSection>
          </E.CardBody>
        </E.CardContent>
      </E.CardBackground>
    </E.Root>
  );
};

const E = {
  Root: styled.View({
    width: "100%",
    height: 430,
    position: "relative",
  }),

  CardShadow: styled.View({
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 30,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12.5,
    elevation: 8,
  }),

  CardBackground: styled(LinearGradient)({
    width: "100%",
    height: "100%",
    borderRadius: 30,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: "#0000000A",
    overflow: "hidden",
    position: "relative",
  }),

  BackgroundPattern: styled.Image({
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
  }),

  CardContent: styled.View({
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 33,
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 1,
  }),

  CardHeader: styled.View({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  }),

  QueueNumberText: styled.Text({
    color: colors.white[100],
    fontFamily: "Pretendard-Variable",
    fontSize: 28,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 38.08,
    letterSpacing: -0.56,
  }),

  ProfileBadge: styled.Image({
    width: 33,
    height: 33,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.white[100],
  }),

  CardBody: styled.View({
    flexDirection: "column",
    gap: 20,
  }),

  StoreInfoSection: styled.View({
    flexDirection: "column",
    gap: 4,
    width: 140,
  }),

  StoreNameText: styled.Text({
    color: colors.white[100],
    ...typography["headline-22-bold"],
  }),

  DepartmentText: styled.Text({
    color: "#FFFFFF99",
    ...typography["text-16-regular"],
  }),

  WaitingInfoSection: styled.View({
    width: 191,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  }),

  WaitingInfoRow: styled.View({
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-start",
    gap: 8,
  }),

  WaitingInfoLabel: styled.Text({
    color: "#FFFFFF99",
    ...typography["text-16-regular"],
  }),

  WaitingInfoValue: styled.Text({
    color: colors.black[10],
    ...typography["text-16-medium"],
  }),
};
