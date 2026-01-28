import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import styled from "@emotion/native";
import { CheckBox } from "./CustomCheckBox";
import { ArrowRightSvg } from "../assets/images";
import { CustomButton } from "./CustomButton";
import React, { useState } from "react";
import Animated from "react-native-reanimated";
import { Pressable, Modal } from "react-native";
import { usePressScaleAnimation } from "../interaction/usePressScaleAnimation";
import TermDetailScreen, {
  TermType,
} from "@/features/phone_number/components/TermDetailScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

const TERM_PRESS_ANIMATION = {
  scale: 0.96,
  opacity: 1,
  dimColor: "rgba(0, 0, 0, 0.1)",
  damping: 70,
  stiffness: 800,
};

/**
 * 약관 항목 인터페이스
 */
interface TermItem {
  id: string; // 고유 식별자
  text: string; // 약관 텍스트
  checked: boolean; // 체크 상태
  onPress: () => void; // 체크박스 클릭 핸들러
  onDetailPress: () => void; // 약관 상세 페이지 이동 핸들러
}

/**
 * CustomBottomSheet Props
 */
interface CustomBottomSheetProps {
  terms: TermItem[]; // 약관 목록
  allChecked: boolean; // 전체 동의 체크 상태
  onAllCheckPress: () => void; // 전체 동의 클릭 핸들러
  onConfirm?: () => void; // 확인 버튼 클릭 핸들러
  isConfirmEnabled?: boolean; // 확인 버튼 활성화 여부
}

/**
 * 약관 항목 애니메이션 컴포넌트
 * - Press 시 scale: 0.96 애니메이션
 * - Press 시 해당 항목에만 dim 표시
 */
// term.id를 TermType으로 변환
const getTermType = (id: string): TermType => {
  const termTypeMap: Record<string, TermType> = {
    service: "service",
    privacy: "privacy",
    marketing: "marketing",
  };
  return termTypeMap[id] || "service";
};

const AnimatedTermItem = React.memo(({ term }: { term: TermItem }) => {
  // Press 인터랙션 애니메이션 훅 사용
  const { isPressed, dimStyle, animatedStyle, handlePressIn, handlePressOut } =
    usePressScaleAnimation(TERM_PRESS_ANIMATION);

  // 모달 상태 관리
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <E.ItemWrapper>
        {/* Press 시 해당 항목만 어두워짐 */}
        {isPressed && <E.ItemDim style={dimStyle} />}
        <Animated.View style={animatedStyle}>
          <E.TermContainerInner>
            {/* 체크박스 영역 - 터치 시 체크 토글 */}
            <Pressable
              style={{ flex: 1 }}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={term.onPress}
            >
              <E.TermRow>
                <CheckBox checked={term.checked} onPress={term.onPress} />
                <E.TermText>{term.text}</E.TermText>
              </E.TermRow>
            </Pressable>
            {/* 화살표 버튼 - 터치 시 모달 띄우기 */}
            <Pressable onPress={() => setIsModalVisible(true)}>
              <ArrowRightSvg />
            </Pressable>
          </E.TermContainerInner>
        </Animated.View>
      </E.ItemWrapper>

      {/* 약관 상세 모달 */}
      <Modal
        visible={isModalVisible}
        animationType="none"
        transparent={false}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <SafeAreaProvider>
          <TermDetailScreen
            type={getTermType(term.id)}
            onClose={() => setIsModalVisible(false)}
          />
        </SafeAreaProvider>
      </Modal>
    </>
  );
});

/**
 * 약관 동의 바텀시트 컴포넌트
 * - 화면 하단에 고정 배치
 * - 전체 동의 체크박스 포함
 * - 개별 약관 항목들을 map으로 렌더링
 * - 각 항목 클릭 시 애니메이션 효과
 */
export const CustomBottomSheet = ({
  terms,
  allChecked,
  onAllCheckPress,
  onConfirm,
  isConfirmEnabled = true,
}: CustomBottomSheetProps) => {
  return (
    <E.Container>
      <E.MainSection>
        {/* 닫기 버튼 (가로 막대) */}
        <E.CloseBtn />
        <E.ContentWrapper>
          {/* 타이틀 */}
          <E.Title>서비스 이용약관에 동의해주세요</E.Title>

          <E.TermsSection>
            {/* 전체 동의 체크박스 */}
            <E.AllCheckContainer onPress={onAllCheckPress}>
              <E.TermRow>
                <CheckBox checked={allChecked} onPress={onAllCheckPress} />
                <E.AllCheckText>약관 전체동의</E.AllCheckText>
              </E.TermRow>
            </E.AllCheckContainer>

            {/* 개별 약관 항목들 */}
            {terms.map((term) => (
              <AnimatedTermItem key={term.id} term={term} />
            ))}
          </E.TermsSection>
        </E.ContentWrapper>
      </E.MainSection>
      {/* 확인 버튼 */}
      <E.ButtonSection>
        <CustomButton variant="rounded12" animated onPress={onConfirm}>
          확인하기
        </CustomButton>
      </E.ButtonSection>
    </E.Container>
  );
};

/**
 * 스타일 컴포넌트 정의
 */
const E = {
  // 바텀시트 최상위 컨테이너 - 화면 하단에 고정
  Container: styled.View({
    left: 0,
    right: 0,
    flexDirection: "column",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.white[100],
    paddingTop: 12,
    paddingHorizontal: 20,
  }),

  // 메인 콘텐츠 영역
  MainSection: styled.View({
    flexDirection: "column",
    alignItems: "center",
    gap: 30,
    alignSelf: "stretch",
  }),

  // 닫기 버튼 (가로 막대 형태)
  CloseBtn: styled.TouchableOpacity({
    width: 38,
    height: 4,
    backgroundColor: "#D8D8D8",
    borderRadius: 999,
  }),

  // 콘텐츠 래퍼
  ContentWrapper: styled.View({
    flexDirection: "column",
    gap: 20,
    alignSelf: "stretch",
  }),

  // 타이틀 텍스트
  Title: styled.Text({
    ...typography["h1-20-bold"],
  }),

  // 약관 섹션
  TermsSection: styled.View({
    flexDirection: "column",
    alignSelf: "stretch",
  }),

  // 전체 동의 컨테이너
  AllCheckContainer: styled.TouchableOpacity({
    height: 50,
    paddingHorizontal: 12,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: colors.black[5],
  }),

  // 체크박스와 텍스트를 담는 가로 행
  TermRow: styled.View({
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  }),

  // 전체 동의 텍스트
  AllCheckText: styled.Text({
    ...typography["text-15-semibold"],
    color: colors.black[90],
  }),

  // 개별 약관 내부 컨테이너
  TermContainerInner: styled.View({
    height: 50,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }),

  // 개별 약관 텍스트
  TermText: styled.Text({
    ...typography["text-15-regular"],
    color: colors.black[70],
  }),

  // 개별 약관 항목 래퍼 - relative positioning을 위함
  ItemWrapper: styled.View({
    position: "relative",
  }),

  // 개별 약관 항목 dim - Press 시 해당 항목만 어두워짐
  ItemDim: styled.View({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 16,
    zIndex: 1,
  }),

  // 버튼 영역
  ButtonSection: styled.View({
    width: "100%",
    height: 124,
    paddingVertical: 32,
    justifyContent: "center",
    alignItems: "center",
  }),
};
