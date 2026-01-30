import styled from "@emotion/native";
import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";

/**
 * 대기 등록 전 확인해야 할 안내사항을 표시하는 컴포넌트
 * - 10분 이내 입장 안내
 * - 신중한 등록 요청
 * - 취소 방법 안내
 */
export const WaitingNotice = () => {
  return (
    <E.InfoContainer>
      <E.Header>대기 등록 전 꼭 확인해주세요</E.Header>

      <E.ListItem>
        <E.ListNumber>•</E.ListNumber>
        <E.ListContent>
          원활한 운영을 위해 호출 시 10분 이내로 입장해주세요.{"\n"}10분 이내
          미입장 시 부스 이용이 어려울 수 있습니다.
        </E.ListContent>
      </E.ListItem>

      <E.ListItem>
        <E.ListNumber>•</E.ListNumber>
        <E.ListContent>
          부스와 부스를 이용하는 다른 고객에게 피해를 줄 수 있어{"\n"}꼭
          방문하실 분만 신중하게 웨이팅을 등록해주세요.
        </E.ListContent>
      </E.ListItem>

      <E.ListItem>
        <E.ListNumber>•</E.ListNumber>
        <E.ListContent>
          부득이하게 방문이 힘드신 경우, 나의 대기카드에서{"\n"}웨이팅을
          취소해주세요.
        </E.ListContent>
      </E.ListItem>
    </E.InfoContainer>
  );
};

const E = {
  InfoContainer: styled.View({
    width: "100%",
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: colors.black[10],
  }),

  Header: styled.Text({
    color: colors.black[80],
    ...typography["title-14-semibold"],
  }),

  ListItem: styled.View({
    flexDirection: "row",
    alignSelf: "stretch",
    paddingLeft: 4,
    gap: 6,
  }),

  ListNumber: styled.Text({
    color: colors.black[60],
    ...typography["text-14-regular"],
  }),

  ListContent: styled.Text({
    flex: 1,
    ...typography["text-14-regular"],
    color: colors.black[60],
  }),
};
