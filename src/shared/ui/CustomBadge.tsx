import { colors } from "@/app/styles/colors";
import styled from "@emotion/native";

type BadgeType = "beforeOpen" | "waiting";

interface CustomBadgeProps {
  type?: BadgeType;
  /** 대기 팀 수. undefined일 경우 자동으로 "오픈 전" 배지로 표시됨 */
  waitNumber?: number;
}

/**
 * 주점의 상태를 표시하는 배지 컴포넌트
 * - waitNumber가 있으면: "대기 N팀" 표시
 * - waitNumber가 없으면: "오픈 전" 표시
 */
export const CustomBadge = ({ type, waitNumber }: CustomBadgeProps) => {
  // type이 "beforeOpen"이거나 waitNumber가 없으면 오픈 전 상태
  const isBeforeOpen = type === "beforeOpen" || waitNumber === undefined;
  const text = isBeforeOpen ? "오픈 전" : `대기 ${waitNumber}팀`;

  // 오픈 전: 회색 배경, 대기 중: 주황색 배경
  const containerBgColor = isBeforeOpen ? colors.black[15] : "#FFE1D799"; // 60%투명도 = 99
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
    // lineHeight
  }),
};
