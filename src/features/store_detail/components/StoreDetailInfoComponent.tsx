import { RootStackParamList } from "@/app/config/routes/routes.core";
import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { ArrowRightSvg, ClockSvg, MapPinSvg } from "@/shared/assets/images";
import { CustomBadge } from "@/shared/ui/CustomBadge";
import { formatOpenTime } from "@/shared/utils/formatOpenTime";
import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StoreDetail } from "../types";

type StoreDetailInfoProps = Pick<
  StoreDetail,
  | "departmentName"
  | "name"
  | "profileImageUrl"
  | "isWaiting"
  | "waitingCount"
  | "location"
  | "openTime"
  | "description"
  | "noticeTitle"
  | "noticeContent"
>;

export const StoreDetailInfoComponent = ({
  departmentName,
  name,
  profileImageUrl,
  isWaiting,
  waitingCount,
  location,
  openTime,
  description,
  noticeTitle,
  noticeContent,
}: StoreDetailInfoProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleNoticePress = () => {
    navigation.navigate("NoticeDetail", { noticeTitle, noticeContent });
  };

  return (
    <E.Container>
      {/* 헤더: 학과, 주점명, 로고 */}
      <E.Header>
        <E.HeaderInfo>
          <E.Department>{departmentName}</E.Department>
          <E.StoreName>{name}</E.StoreName>
        </E.HeaderInfo>
        {profileImageUrl ? (
          <E.LogoImage source={{ uri: profileImageUrl }} />
        ) : (
          <E.LogoPlaceholder />
        )}
      </E.Header>

      {/* 대기 상태 배지 */}
      <E.BadgeWrapper>
        <CustomBadge isActive={isWaiting} waitingCount={waitingCount} />
      </E.BadgeWrapper>

      <E.Divider />

      {/* 위치, 운영시간 */}
      <E.InfoList>
        <E.InfoRow>
          <MapPinSvg />
          <E.InfoText>{location}</E.InfoText>
        </E.InfoRow>
        <E.InfoRow>
          <ClockSvg />
          <E.InfoText>{formatOpenTime(openTime)}</E.InfoText>
        </E.InfoRow>
      </E.InfoList>

      {/* 주점 소개 */}
      <E.DescriptionWrapper>
        <E.Description>{description}</E.Description>
      </E.DescriptionWrapper>

      {/* 공지 버튼 */}
      <E.NoticeWrapper>
        <E.NoticeButton onPress={handleNoticePress}>
          <E.NoticeContent>
            <E.NoticeLabel>공지</E.NoticeLabel>
            <E.NoticeText>{noticeTitle}</E.NoticeText>
          </E.NoticeContent>
          <ArrowRightSvg />
        </E.NoticeButton>
      </E.NoticeWrapper>
    </E.Container>
  );
};

const E = {
  Container: styled.View({
    width: "100%",
    flexDirection: "column",
    backgroundColor: "white",
    paddingTop: 21,
    paddingHorizontal: 20,
  }),
  Header: styled.View({
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  HeaderInfo: styled.View({
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 3,
    flexShrink: 0,
  }),
  Department: styled.Text({
    overflow: "hidden",
    color: colors.black[70],
    fontSize: 14,
    fontFamily: "Pretendard",
    fontWeight: "400",
    lineHeight: 14 * 1.44,
    letterSpacing: -0.14,
  }),
  StoreName: styled.Text({
    color: colors.black[100],
    ...typography["headline-22-bold"],
  }),
  LogoImage: styled.Image({
    width: 52,
    height: 52,
    flexShrink: 0,
    borderRadius: 999,
  }),
  LogoPlaceholder: styled.View({
    width: 52,
    height: 52,
    flexShrink: 0,
    borderRadius: 999,
    backgroundColor: colors.black[60],
  }),
  BadgeWrapper: styled.View({
    width: "100%",
    paddingTop: 20,
    paddingBottom: 22,
    alignItems: "flex-start",
  }),
  Divider: styled.View({
    width: "100%",
    height: 1,
    backgroundColor: colors.black[20],
  }),
  InfoList: styled.View({
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
    paddingTop: 22,
  }),
  InfoRow: styled.View({
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  }),
  InfoText: styled.Text({
    color: colors.black[65],
    ...typography["text-16-regular"],
  }),
  DescriptionWrapper: styled.View({
    width: "100%",
    paddingTop: 23,
  }),
  Description: styled.Text({
    color: colors.black[80],
    ...typography["text-16-regular"],
  }),
  NoticeWrapper: styled.View({
    width: "100%",
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  }),
  NoticeButton: styled.TouchableOpacity({
    width: "100%",
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.black[10],
  }),
  NoticeContent: styled.View({
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  }),
  NoticeLabel: styled.Text({
    color: colors.black[50],
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 14 * 1.44,
  }),
  NoticeText: styled.Text({
    color: colors.black[70],
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 14 * 1.44,
  }),
};
