import {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
} from "react";
import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import styled from "@emotion/native";

const OVERLAY_OPACITY = 0.6;
const FADE_DURATION = 250;

interface ModalContextType {
  isModalVisible: boolean;
  showModal: () => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

/**
 * 모달 상태 Provider — 하위 트리에 모달 visible 상태를 공급하고, 활성 시 페이드 배경 오버레이를 렌더링
 * @param children - 하위 컴포넌트
 */
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOverlayMounted, setIsOverlayMounted] = useState(false);
  const overlayOpacity = useSharedValue(0);
  const unmountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const showModal = () => {
    if (unmountTimerRef.current) {
      clearTimeout(unmountTimerRef.current);
      unmountTimerRef.current = null;
    }
    setIsOverlayMounted(true);
    setIsModalVisible(true);
    overlayOpacity.value = withTiming(1, { duration: FADE_DURATION });
  };

  const hideModal = () => {
    setIsModalVisible(false);
    overlayOpacity.value = withTiming(0, { duration: FADE_DURATION });
    unmountTimerRef.current = setTimeout(() => {
      setIsOverlayMounted(false);
      unmountTimerRef.current = null;
    }, FADE_DURATION);
  };

  return (
    <ModalContext.Provider value={{ isModalVisible, showModal, hideModal }}>
      <E.Wrapper>
        {children}
        {isOverlayMounted && (
          <Animated.View
            style={[OVERLAY_STYLE, overlayAnimatedStyle]}
            pointerEvents={isModalVisible ? "auto" : "none"}
          >
            <Pressable style={FILL_STYLE} onPress={hideModal} />
          </Animated.View>
        )}
      </E.Wrapper>
    </ModalContext.Provider>
  );
};

/**
 * 모달 상태 접근 훅 — ModalProvider 내부에서만 사용 가능
 * @returns isModalVisible, showModal, hideModal
 */
export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

const OVERLAY_STYLE = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: `rgba(0, 0, 0, ${OVERLAY_OPACITY})`,
  zIndex: 10000,
};

const FILL_STYLE = { flex: 1 };

const E = {
  Wrapper: styled.View({
    flex: 1,
  }),
};
