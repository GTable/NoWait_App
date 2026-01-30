import styled from "@emotion/native";
import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";

/**
 * 대기 등록 정보를 표시하는 컴포넌트
 * 부스 이름과 입장 인원을 보여줌
 */
interface WaitingDetailInfoProps {
  /** 부스 이름 (ex: "스페이시스 / 컴퓨터공학과") */
  boothName: string;
  /** 입장 인원 수 */
  personCount: number;
}

export const WaitingDetailInfo = ({
  boothName,
  personCount,
}: WaitingDetailInfoProps) => {
  return (
    <E.DetailContainer>
      <E.ContentContainer>
        <E.Label>부스</E.Label>
        <E.Content>{boothName}</E.Content>
      </E.ContentContainer>

      <E.ContentContainer>
        <E.Label>입장 인원</E.Label>
        <E.Content>{personCount}명</E.Content>
      </E.ContentContainer>
    </E.DetailContainer>
  );
};

const E = {
  DetailContainer: styled.View({
    marginTop: 40,
    width: "100%",
    padding: 22,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
    borderRadius: 16,
    backgroundColor: colors.black[10],
  }),

  ContentContainer: styled.View({
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  }),

  Label: styled.Text({
    overflow: "hidden",
    color: colors.black[50],
    textAlign: "right",
    ...typography["text-16-medium"],
  }),

  Content: styled.Text({
    color: colors.black[90],
    textAlign: "right",
    ...typography["text-16-medium"],
  }),
};
