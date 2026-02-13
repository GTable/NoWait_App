import { Pressable } from "react-native";
import Reanimated from "react-native-reanimated";
import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { CancelSvg } from "@/shared/assets/images";
import { usePressScaleAnimation } from "@/shared/interaction/usePressScaleAnimation";
import styled from "@emotion/native";

const CANCEL_PRESS_ANIMATION = {
  scale: 0.96,
  opacity: 1,
  dimColor: "#0220470D",
  damping: 55,
  stiffness: 1000,
};

interface WaitingCancelButtonProps {
  onPress: () => void;
}

/**
 * 대기 취소 액션 버튼.
 */
export const WaitingCancelButton = ({ onPress }: WaitingCancelButtonProps) => {
  const {
    dimStyle,
    dimAnimatedStyle,
    animatedStyle,
    handlePressIn,
    handlePressOut,
  } = usePressScaleAnimation(CANCEL_PRESS_ANIMATION);

  return (
    <E.Wrapper>
      {/* 프레스 시 배경 dim 레이어 */}
      <E.Dim pointerEvents="none" style={[dimStyle, dimAnimatedStyle]} />

      {/* 프레스 스케일 애니메이션 레이어 */}
      <Reanimated.View style={animatedStyle}>
        <E.Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <E.Row>
            <CancelSvg width={20} height={20} />
            <E.Text numberOfLines={1}>대기 취소</E.Text>
          </E.Row>
        </E.Pressable>
      </Reanimated.View>
    </E.Wrapper>
  );
};

const E = {
  Wrapper: styled.View({
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  }),

  Dim: styled(Reanimated.View)({
    position: "absolute",
    top: -4,
    right: -8,
    bottom: -4,
    left: -8,
    borderRadius: 12,
    zIndex: 1,
  }),

  Pressable: styled(Pressable)({
    zIndex: 2,
  }),

  Row: styled.View({
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  }),

  Text: styled.Text({
    color: colors.black[55],
    textAlign: "center",
    ...typography["title-16-semibold"],
  }),
};
