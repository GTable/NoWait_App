import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { SignupSvg } from "@/shared/assets/images";
import styled from "@emotion/native";

/**
 * 회원가입 완료 축하 화면
 * - 3초간 표시 후 자동으로 메인 화면으로 이동
 */
const SuccessScreen = () => {
  return (
    <E.Container>
      <SignupSvg />
      <E.Title>가입을 축하드려요</E.Title>
      <E.Content>노웨잇과 함께 축제를 즐겨봐요!</E.Content>
    </E.Container>
  );
};

export default SuccessScreen;

const E = {
  Container: styled.View({
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white[100],
  }),

  Title: styled.Text({
    paddingTop: 30,
    alignSelf: "stretch",
    color: colors.black[100],
    textAlign: "center",
    ...typography["headline-24-bold"],
  }),

  Content: styled.Text({
    paddingTop: 14,
    alignSelf: "stretch",
    color: colors.black[70],
    textAlign: "center",
    fontFamily: "Pretendard",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 23.04,
    letterSpacing: -0.16,
  }),
};
