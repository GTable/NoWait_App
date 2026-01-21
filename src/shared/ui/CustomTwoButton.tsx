import { colors } from "@/app/styles/colors";
import styled from "@emotion/native";
import { BookmarkFilledSvg, BookmarkSvg, LineShareSvg } from "../assets/images";
import { typography } from "@/app/styles/typography";

type ButtonType = "waiting" | "share";

interface CustomTwoButtonProps {
  /** 버튼 타입 (waiting: 대기하기, share: 웨이팅하기) */
  type: ButtonType;
  /** 북마크 활성화 상태 (type이 waiting일 때만 사용) */
  isBookmarked?: boolean;
  /** 왼쪽 버튼 클릭 핸들러 */
  onLeftPress?: () => void;
  /** 오른쪽 버튼 클릭 핸들러 */
  onRightPress?: () => void;
}

export const CustomTwoButton = ({
  type,
  isBookmarked = false,
  onLeftPress,
  onRightPress,
}: CustomTwoButtonProps) => {
  const renderIcon = () => {
    if (type === "share") {
      return <LineShareSvg />;
    }
    return isBookmarked ? <BookmarkFilledSvg /> : <BookmarkSvg />;
  };

  const buttonText = type === "share" ? "웨이팅하기" : "대기하기";

  return (
    <E.Wrapper>
      <E.Container>
        <E.LeftBtn onPress={onLeftPress}>
          <E.IconBox>{renderIcon()}</E.IconBox>
        </E.LeftBtn>

        <E.RightBtn onPress={onRightPress}>
          <E.TextBox>{buttonText}</E.TextBox>
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
