import { colors } from "@/app/styles/colors";
import styled from "@emotion/native";
import { BookmarkFilledSvg, BookmarkSvg } from "../assets/images";
import { typography } from "@/app/styles/typography";

interface CustomTwoButtonProps {
  /** 북마크 활성화 상태 */
  isBookmark?: boolean;
  /** 주점 운영 상태 */
  isActive?: boolean;
  /** 웨이팅 상태 */
  isWaiting?: boolean;
  /** 왼쪽 버튼 클릭 핸들러 */
  onLeftPress?: () => void;
  /** 오른쪽 버튼 클릭 핸들러 */
  onRightPress?: () => void;
}

export const CustomTwoButton = ({
  isBookmark,
  isActive,
  isWaiting,
  onLeftPress,
  onRightPress,
}: CustomTwoButtonProps) => {
  // 웨이팅 중인 상태
  const isWaitingState = Boolean(isWaiting);
  // 비활성 상태지만 웨이팅 중이 아닌 경우
  const isInactive = isActive === false && !isWaitingState;
  // 상태에 따라 버튼 문구 결정
  const buttonText = isWaitingState
    ? "대기 중이에요"
    : isInactive
      ? "지금은 대기할 수 없어요"
      : "대기하기";
  // 웨이팅 중/비활성 상태는 톤다운 색상 사용
  const backgroundColor =
    isWaitingState || isInactive ? colors.black[15] : colors.coolBlack[100];
  const textColor =
    isWaitingState || isInactive ? colors.black[50] : colors.white[100];

  const renderIcon = () =>
    isBookmark ? <BookmarkFilledSvg /> : <BookmarkSvg />;

  return (
    <E.Wrapper>
      <E.Container>
        <E.LeftBtn onPress={onLeftPress}>
          <E.IconBox>{renderIcon()}</E.IconBox>
        </E.LeftBtn>

        <E.RightBtn onPress={onRightPress} style={{ backgroundColor }}>
          <E.TextBox style={{ color: textColor }}>{buttonText}</E.TextBox>
        </E.RightBtn>
      </E.Container>
    </E.Wrapper>
  );
};

const E = {
  Wrapper: styled.View({
    width: "100%",
    flexDirection: "column",
    paddingTop: 30,
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  }),

  Container: styled.View({
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  }),

  LeftBtn: styled.TouchableOpacity({
    display: "flex",
    width: 80,
    height: 60,
    paddingVertical: 19,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderColor: colors.black[25],
    borderWidth: 1,
    backgroundColor: colors.white[100],
  }),

  IconBox: styled.View({
    width: 24,
    height: 24,
  }),

  RightBtn: styled.TouchableOpacity({
    display: "flex",
    height: 60,
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    borderRadius: 12,
    backgroundColor: colors.coolBlack[100],
  }),

  TextBox: styled.Text({
    overflow: "hidden",
    color: colors.white[100],
    textAlign: "center",
    ...typography["button-17-semibold"],
  }),
};
