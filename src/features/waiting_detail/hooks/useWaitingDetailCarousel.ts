import { useRef, useState } from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { WaitingDetailItem } from "../model/WaitingDetailModel";

const WAITING_CARD_WIDTH = 282;
const WAITING_CARD_GAP = 32;
const SNAP_INTERVAL = WAITING_CARD_WIDTH + WAITING_CARD_GAP;

/**
 * 대기 상세 카드 캐러셀의 인덱스/스크롤 상태를 관리한다.
 */
export const useWaitingDetailCarousel = (items: WaitingDetailItem[]) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const updateActiveIndex = (offsetX: number) => {
    const index = Math.round(offsetX / SNAP_INTERVAL);
    const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
    if (activeIndexRef.current === clampedIndex) return;

    activeIndexRef.current = clampedIndex;
    setActiveIndex(clampedIndex);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    updateActiveIndex(event.nativeEvent.contentOffset.x);
  };

  const handleScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    updateActiveIndex(event.nativeEvent.contentOffset.x);
  };

  return {
    scrollX,
    activeIndex,
    snapInterval: SNAP_INTERVAL,
    cardWidth: WAITING_CARD_WIDTH,
    cardGap: WAITING_CARD_GAP,
    handleScroll,
    handleScrollEnd,
  };
};
