import { CustomBottomSheet } from "@/shared/ui/CustomBottomSheet";
import styled from "@emotion/native";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, Modal, Pressable } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

/**
 * 약관 동의 바텀시트
 * - 하단에서 슬라이드 업 애니메이션
 * - 전체 동의 및 개별 약관 체크
 */
interface TermItem {
  id: string;
  text: string;
  checked: boolean;
  onPress: () => void;
  onDetailPress: () => void;
}

interface TermsBottomSheetProps {
  visible: boolean;
  terms: TermItem[];
  allChecked: boolean;
  onAllCheckPress: () => void;
  onConfirm: () => void;
  isConfirmEnabled: boolean;
  onClose: () => void;
}

export const TermsBottomSheet = ({
  visible,
  terms,
  allChecked,
  onAllCheckPress,
  onConfirm,
  isConfirmEnabled,
  onClose,
}: TermsBottomSheetProps) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // visible이 true로 변경될 때만 애니메이션 실행
  useEffect(() => {
    if (visible) {
      slideAnim.setValue(SCREEN_HEIGHT);
      Animated.spring(slideAnim, {
        toValue: 0,
        damping: 20,
        stiffness: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <E.ModalOverlay>
        <Pressable style={{ flex: 1 }} onPress={handleClose} />
        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <Pressable>
            <CustomBottomSheet
              terms={terms}
              allChecked={allChecked}
              onAllCheckPress={onAllCheckPress}
              onConfirm={onConfirm}
              isConfirmEnabled={isConfirmEnabled}
            />
          </Pressable>
        </Animated.View>
      </E.ModalOverlay>
    </Modal>
  );
};

const E = {
  ModalOverlay: styled.View({
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.60)",
    justifyContent: "flex-end",
  }),
};
