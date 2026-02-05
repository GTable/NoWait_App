import { colors } from "@/app/styles/colors";
import styled from "@emotion/native";

interface CustomBadgeProps {
  /** 주점 오픈 여부. false면 "오픈 전"으로 표시됨 */
  isActive: boolean;
  /** 대기 팀 수 */
  waitingCount: number;
}

/**
 * 주점의 상태를 표시하는 배지 컴포넌트
 * - isActive가 false이면: "오픈 전" 표시
 * - isActive가 true이면: "대기 N팀" 표시
 */
export const CustomBadge = (props: CustomBadgeProps) => {
  const isBeforeOpen = props.isActive === false;
  const text = isBeforeOpen ? "오픈 전" : `대기 ${props.waitingCount}팀`;

  const containerBgColor = isBeforeOpen ? colors.black[15] : "#FFE1D799";
  const textColor = isBeforeOpen ? colors.black[50] : colors.primary;

  return (
    <E.Container style={{ backgroundColor: containerBgColor }}>
      <E.Text style={{ color: textColor }}>{text}</E.Text>
    </E.Container>
  );
};

const E = {
  Container: styled.View({
    display: "flex",
    paddingTop: 5,
    paddingBottom: 6,
    paddingHorizontal: 6,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  }),

  Text: styled.Text({
    textAlign: "center",
    fontFamily: "Pretendard",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "700",
  }),
};
