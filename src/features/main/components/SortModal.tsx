import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { CustomButton } from "@/shared/ui/CustomButton";
import { RadioButton } from "@/shared/ui/CustomRadioButton";
import styled from "@emotion/native";
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { SortOption } from "@/screens/main/MainScreen";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SPRING_CONFIG = { damping: 20, stiffness: 150 };
const UNMOUNT_DELAY = 300;

/**
 * 주점 정렬 옵션 선택 모달
 *
 * - 대기 적은 순 / 인기 순 선택
 * - 하단에서 슬라이드 업 애니메이션
 */
interface SortModalProps {
  visible: boolean;
  currentSort: SortOption;
  onConfirm: (option: SortOption) => void;
}

export const SortModal = ({
  visible,
  currentSort,
  onConfirm,
}: SortModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOption>(currentSort);
  const translateY = useSharedValue(SCREEN_HEIGHT);

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    setSelectedSort(currentSort);
  }, [currentSort, visible]);

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      translateY.value = withSpring(0, SPRING_CONFIG);
    } else {
      translateY.value = withSpring(SCREEN_HEIGHT, SPRING_CONFIG);
      const timer = setTimeout(() => setIsMounted(false), UNMOUNT_DELAY);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!isMounted) return null;

  return (
    <E.Wrapper pointerEvents="box-none">
      <Animated.View style={[CONTENT_WRAPPER_STYLE, slideStyle]}>
        <E.Content>
          <E.Header>
            <E.Title>정렬</E.Title>

            <E.OptionList>
              <E.OptionItem onPress={() => setSelectedSort("asc")}>
                <E.OptionText>대기 적은 순</E.OptionText>
                <RadioButton
                  checked={selectedSort === "asc"}
                  onPress={() => setSelectedSort("asc")}
                />
              </E.OptionItem>

              <E.OptionItem onPress={() => setSelectedSort("desc")}>
                <E.OptionText>인기 순</E.OptionText>
                <RadioButton
                  checked={selectedSort === "desc"}
                  onPress={() => setSelectedSort("desc")}
                />
              </E.OptionItem>
            </E.OptionList>
          </E.Header>

          <E.ButtonContainer>
            <CustomButton
              variant="rounded16"
              onPress={() => onConfirm(selectedSort)}
            >
              확인
            </CustomButton>
          </E.ButtonContainer>
        </E.Content>
      </Animated.View>
    </E.Wrapper>
  );
};

const CONTENT_WRAPPER_STYLE = {
  position: "absolute" as const,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 10001,
};

const E = {
  Wrapper: styled.View({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10001,
    justifyContent: "flex-end",
  }),

  Content: styled.View({
    backgroundColor: colors.white[100],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 28,
  }),

  Header: styled.View({
    width: "100%",
    paddingLeft: 4,
    gap: 30,
  }),

  Title: styled.Text({
    color: colors.black[90],
    ...typography["title-20-semibold"],
  }),

  OptionList: styled.View({
    gap: 20,
  }),

  OptionItem: styled.TouchableOpacity({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }),

  OptionText: styled.Text({
    color: colors.black[90],
    ...typography["title-18-semibold"],
  }),

  ButtonContainer: styled.View({
    width: "100%",
    paddingBottom: 40,
  }),
};
