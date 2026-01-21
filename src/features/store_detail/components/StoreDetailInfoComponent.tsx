import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { ArrowRightSvg, ClockSvg, MapPinSvg } from "@/shared/assets/images";
import { CustomBadge } from "@/shared/ui/CustomBadge";
import styled from "@emotion/native";

export const StoreDetailInfoComponent = () => {
  return (
    <E.Container>
      {/* 헤더: 학과, 주점명, 로고 */}
      <E.Header>
        <E.HeaderInfo>
          <E.Department>컴퓨터공학과</E.Department>
          <E.StoreName>일이삼사오육칠팔구십일이삼사</E.StoreName>
        </E.HeaderInfo>
        <E.Logo />
      </E.Header>

      {/* 대기 상태 배지 */}
      <E.BadgeWrapper>
        <CustomBadge isActive={false} waitingCount={0} />
      </E.BadgeWrapper>

      <E.Divider />

      {/* 위치, 운영시간 */}
      <E.InfoList>
        <E.InfoRow>
          <MapPinSvg />
          <E.InfoText>가천대학교 무한광장</E.InfoText>
        </E.InfoRow>
        <E.InfoRow>
          <ClockSvg />
          <E.InfoText>18:00 - 24:00</E.InfoText>
        </E.InfoRow>
      </E.InfoList>

      {/* 주점 소개 */}
      <E.DescriptionWrapper>
        <E.Description>
          안녕하세요! 컴공과가 버그 없이 준비한{"\n"}이스터에그가 가득 부스
          스페이시스입니다 🚀 {"\n"}
          {"\n"}남다른 디버깅 실력으로 굽는 츄러스,{"\n"}데이터 손실 없는
          아이스티,{"\n"}그리고 메모리 오류 없는 넉넉한 양까지 {"\n"}완벽
          구현했습니다.
        </E.Description>
      </E.DescriptionWrapper>

      {/* 공지 버튼 */}
      <E.NoticeWrapper>
        <E.NoticeButton>
          <E.NoticeContent>
            <E.NoticeLabel>공지</E.NoticeLabel>
            <E.NoticeText>입장 시 신분증 검사 필수</E.NoticeText>
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
  Logo: styled.View({
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
