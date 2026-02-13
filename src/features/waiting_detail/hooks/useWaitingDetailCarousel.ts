import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { WaitingDetailItem } from "../model/WaitingDetailApi";

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

  const updateActiveIndex = useCallback((offsetX: number) => {
    const index = Math.round(offsetX / SNAP_INTERVAL);
    const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
    if (activeIndexRef.current === clampedIndex) return;

    activeIndexRef.current = clampedIndex;
    setActiveIndex(clampedIndex);
  }, [items.length]);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    updateActiveIndex(event.nativeEvent.contentOffset.x);
  }, [updateActiveIndex]);

  const handleScrollEnd = useCallback((
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    updateActiveIndex(event.nativeEvent.contentOffset.x);
  }, [updateActiveIndex]);

  useEffect(() => {
    if (items.length === 0) {
      activeIndexRef.current = 0;
      setActiveIndex(0);
      scrollX.setValue(0);
      return;
    }

    if (activeIndexRef.current >= items.length) {
      const lastIndex = items.length - 1;
      activeIndexRef.current = lastIndex;
      setActiveIndex(lastIndex);
      scrollX.setValue(lastIndex * SNAP_INTERVAL);
    }
  }, [items.length, scrollX]);

  const setInitialIndex = useCallback((index: number) => {
    if (items.length === 0) return;

    const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
    activeIndexRef.current = clampedIndex;
    setActiveIndex(clampedIndex);
    scrollX.setValue(clampedIndex * SNAP_INTERVAL);
  }, [items.length, scrollX]);

  return {
    scrollX,
    activeIndex,
    snapInterval: SNAP_INTERVAL,
    cardWidth: WAITING_CARD_WIDTH,
    cardGap: WAITING_CARD_GAP,
    handleScroll,
    handleScrollEnd,
    setInitialIndex,
  };
};
