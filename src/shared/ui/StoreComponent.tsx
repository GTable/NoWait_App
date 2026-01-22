/**
 * 모든 주점과 검색 결과에서 사용할 수 있는 공통 주점 카드 컴포넌트
 */

import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { RootStackParamList } from "@/app/config/routes/routes.core";
import styled from "@emotion/native";
import { CustomBadge } from "./CustomBadge";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { usePressScaleAnimation } from "../interaction/usePressScaleAnimation";
import { Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

/**
 * 프레스 애니메이션 설정값
 * - scale: 눌렀을 때 카드 크기 (0.96 = 96%)
 * - opacity: 눌렀을 때 투명도 (1 = 변화 없음)
 * - dimColor: 눌렀을 때 오버레이 색상 (#0220470D = 5% 투명도)
 * - damping: 스프링 감쇠 (높을수록 덜 튀김)
 * - stiffness: 스프링 강도 (높을수록 빠름)
 */
const STORE_PRESS_ANIMATION = {
  scale: 0.96,
  opacity: 1,
  dimColor: "#0220470D",
  damping: 200,
  stiffness: 1000,
};

/** 기본 수평 패딩 */
const BASE_PADDING_HORIZONTAL = 20;
/** 눌렀을 때 수평 패딩 (줄어듦) */
const PRESSED_PADDING_HORIZONTAL = 14;

interface StoreComponentProps {
  /** 주점 공개 코드 (상세 페이지 이동용) */
  publicCode: string;
  /** 주점 이름 */
  name: string;
  /** 학과명 */
  departmentName: string;
  /** 주점 로고 이미지 URL */
  storeLogoUrl?: string;
  /** 주점 오픈 여부. false면 "오픈 전" 배지 표시 */
  isActive: boolean;
  /** 대기 팀 수 */
  waitingCount: number;
  /** 클릭 시 추가 동작 (네비게이션 전에 호출됨) */
  onPress?: () => void;
}

/**
 * 주점 정보를 표시하는 카드 컴포넌트
 * - 주점 로고, 이름, 학과, 대기 상태를 표시
 * - 클릭 가능한 카드 형태로 제공
 */
export const StoreComponent = (props: StoreComponentProps) => {
  const {
    publicCode,
    name,
    departmentName,
    storeLogoUrl,
    isActive,
    waitingCount,
    onPress,
  } = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    onPress?.();
    navigation.navigate("StoreDetail", { publicCode });
  };
  // scale, opacity, dim 효과를 위한 애니메이션 훅
  const {
    dimStyle,
    dimAnimatedStyle,
    animatedStyle,
    handlePressIn,
    handlePressOut,
  } = usePressScaleAnimation(STORE_PRESS_ANIMATION);

  // 수평 패딩 애니메이션을 위한 shared value (20에서 시작)
  const paddingH = useSharedValue(BASE_PADDING_HORIZONTAL);

  // 패딩 값이 변할 때 적용되는 애니메이션 스타일
  const paddingAnimatedStyle = useAnimatedStyle(() => ({
    paddingHorizontal: paddingH.value,
  }));

  // 누를 때: scale/dim 효과 + 패딩 줄어듦 (20 → 14)
  const onPressIn = () => {
    handlePressIn();
    paddingH.value = withSpring(PRESSED_PADDING_HORIZONTAL, {
      damping: STORE_PRESS_ANIMATION.damping,
      stiffness: STORE_PRESS_ANIMATION.stiffness,
    });
  };

  // 뗄 때: scale/dim 효과 + 패딩 복원 (14 → 20)
  const onPressOut = () => {
    handlePressOut();
    paddingH.value = withSpring(BASE_PADDING_HORIZONTAL, {
      damping: STORE_PRESS_ANIMATION.damping,
      stiffness: STORE_PRESS_ANIMATION.stiffness,
    });
  };

  return (
    <E.Wrapper>
      {/* 눌렀을 때 나타나는 dim 오버레이 */}
      <E.Dim pointerEvents="none" style={[dimStyle, dimAnimatedStyle]} />

      {/* scale/opacity 애니메이션이 적용되는 영역 */}
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={handlePress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          {/* 패딩 애니메이션이 적용되는 컨테이너 */}
          <E.Container style={paddingAnimatedStyle}>
            <E.ContentWrapper>
              <E.StoreLogo>
                {storeLogoUrl ? (
                  <E.StoreLogoImage
                    source={{ uri: storeLogoUrl }}
                    resizeMode="cover"
                  />
                ) : null}
              </E.StoreLogo>
              <E.InfoSection>
                <E.TopRow>
                  <E.StoreName numberOfLines={1} ellipsizeMode="tail">
                    {name}
                  </E.StoreName>
                  <CustomBadge
                    isActive={isActive}
                    waitingCount={waitingCount}
                  />
                </E.TopRow>
                <E.Department>{departmentName}</E.Department>
              </E.InfoSection>
            </E.ContentWrapper>
          </E.Container>
        </Pressable>
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

  /** 전체 카드 컨테이너 */
  Container: styled(Animated.View)({
    width: "100%",
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
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  }),

  StoreLogoImage: styled(Image)({
    width: "100%",
    height: "100%",
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
