/**
 * 모든 주점과 검색 결과에서 사용할 수 있는 공통 주점 카드 컴포넌트
 */

import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import styled from "@emotion/native";
import { CustomBadge } from "./CustomBadge";
import Animated from "react-native-reanimated";
import { usePressScaleAnimation } from "../interaction/usePressScaleAnimation";

const STORE_PRESS_ANIMATION = {
  scale: 0.96,
  opacity: 1,
  dimColor: "rgba(2, 32, 71, 0.05)",
  damping: 55,
  stiffness: 800,
};

interface StoreComponentProps {
  /** 주점 이름 */
  storeName: string;
  /** 학과명 */
  department: string;
  /** 대기 팀 수 (없으면 "오픈 전" 배지 표시) */
  waitNumber?: number;
  /** 카드 클릭 시 실행될 콜백 함수 */
  onPress?: () => void;
}

/**
 * 주점 정보를 표시하는 카드 컴포넌트
 * - 주점 로고, 이름, 학과, 대기 상태를 표시
 * - 클릭 가능한 카드 형태로 제공
 */
export const StoreComponent = ({
  storeName,
  department,
  waitNumber,
  onPress,
}: StoreComponentProps) => {
  const {
    isPressed,
    dimStyle,
    dimAnimatedStyle,
    animatedStyle,
    handlePressIn,
    handlePressOut,
  } = usePressScaleAnimation(STORE_PRESS_ANIMATION);

  return (
    <E.Wrapper>
      <E.Dim
        pointerEvents="none"
        style={[dimStyle, dimAnimatedStyle]}
      />
      <Animated.View style={animatedStyle}>
        <E.Container
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
          style={isPressed ? { paddingHorizontal: 14 } : undefined}
        >
          <E.ContentWrapper>
            {/* 주점 로고 */}
            <E.StoreLogo />

            <E.InfoSection>
              <E.TopRow>
                {/* 주점 이름 (길면 말줄임표 처리) */}
                <E.StoreName numberOfLines={1} ellipsizeMode="tail">
                  {storeName}
                </E.StoreName>
                {/* 대기 상태 배지 */}
                <CustomBadge waitNumber={waitNumber} />
              </E.TopRow>

              {/* 학과명 */}
              <E.Department>{department}</E.Department>
            </E.InfoSection>
          </E.ContentWrapper>
        </E.Container>
      </Animated.View>
    </E.Wrapper>
  );
};

const E = {
  Wrapper: styled.View({
    position: "relative",
    width: "100%",
  }),

  Dim: styled(Animated.View)({
    position: "absolute",
    top: 0,
    left: 14,
    right: 14,
    bottom: 0,
    borderRadius: 15.4,
    zIndex: 1,
  }),

  /** 전체 카드 컨테이너 (클릭 가능) */
  Container: styled.TouchableOpacity({
    display: "flex",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
  }),

  /** 로고와 정보 섹션을 감싸는 래퍼 */
  ContentWrapper: styled.View({
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  }),

  /** 주점 로고 (원형) */
  StoreLogo: styled.View({
    width: 44,
    height: 44,
    borderRadius: 44,
    backgroundColor: "#0063A7",
  }),

  /** 주점 정보(이름, 학과, 배지) 영역 */
  InfoSection: styled.View({
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  }),

  /** 주점 이름과 배지를 포함하는 상단 행 */
  TopRow: styled.View({
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingRight: 10,
  }),

  /** 주점 이름 텍스트 */
  StoreName: styled.Text({
    flexShrink: 1,
    color: colors.black[90],
    fontFamily: "Pretendard",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 16 * 1.44,
  }),

  /** 학과명 텍스트 */
  Department: styled.Text({
    color: colors.black[70],
    ...typography["text-13-regular"],
  }),
};
