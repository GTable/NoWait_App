import styled from "@emotion/native";
import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";

/**
 * 현재 대기 중인 팀 수를 표시하는 컴포넌트
 * "현재 N팀이 대기하고 있어요" 형태로 표시
 */
interface WaitingTeamCountProps {
  /** 대기 중인 팀 수 */
  count: number;
}

export const WaitingTeamCount = ({ count }: WaitingTeamCountProps) => {
  return (
    <E.Title>
      현재 <E.HighlightText>{count}</E.HighlightText>팀이{"\n"}대기하고 있어요
    </E.Title>
  );
};

const E = {
  Title: styled.Text({
    color: colors.black[100],
    ...typography["headline-24-bold"],
  }),

  HighlightText: styled.Text({
    color: colors.primary,
  }),
};
