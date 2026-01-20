import styled from "@emotion/native";
import { AlertCircleSvg } from "../assets/images";
import { colors } from "@/app/styles/colors";

export const CustomToast = () => {
  return (
    <E.Wrapper>
      <E.Container>
        <E.IconBox>
          <AlertCircleSvg />
        </E.IconBox>
        <E.TextBox>로그인에 실패했습니다.</E.TextBox>
      </E.Container>
    </E.Wrapper>
  );
};

const E = {
  Wrapper: styled.View({
    flexDirection: "row",
  }),
  Container: styled.View({
    flexDirection: "row",
    paddingVertical: 9,
    paddingHorizontal: 10,
    backgroundColor: "#16191ECC",
    borderRadius: 999,
    borderColor: "rgba(22, 25, 30, 0.80)",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  }),
  IconBox: styled.View({
    width: 22,
    height: 22,
  }),
  TextBox: styled.Text({
    overflow: "hidden",
    color: colors.white[100],
    textAlign: "center",
    fontFamily: "Pretendard",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "500",
  }),
};
