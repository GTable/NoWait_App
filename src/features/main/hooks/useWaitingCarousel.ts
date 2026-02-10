import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";

/**
 * 대기 카드 세로 무한 루프 캐러셀 로직
 * - 3배로 복제하여 무한 스크롤 구현
 * - 스크롤 종료 시 루프 위치 보정
 * - 스케일 애니메이션용 scrollY 제공
 */
export const useWaitingCarousel = <T,>(
  items: T[],
  cardHeight: number,
) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);

  const loopedItems = useMemo(
    () => (items.length ? [...items, ...items, ...items] : items),
    [items],
  );
  const baseIndex = items.length;

  useEffect(() => {
    if (items.length > 1) {
      requestAnimationFrame(() => {
        scrollY.setValue(baseIndex * cardHeight);
        scrollRef.current?.scrollTo({
          y: baseIndex * cardHeight,
          animated: false,
        });
      });
    }
  }, [baseIndex, cardHeight, items.length, scrollY]);

  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const nextIndex = Math.round(offsetY / cardHeight);
      const total = items.length;

      if (total > 1) {
        let targetY: number | null = null;

        if (nextIndex <= total - 1) {
          targetY = (nextIndex + total) * cardHeight;
        } else if (nextIndex >= total * 2) {
          targetY = (nextIndex - total) * cardHeight;
        }

        if (targetY !== null) {
          scrollY.setValue(targetY);
          scrollRef.current?.scrollTo({ y: targetY, animated: false });
          const normalizedIndex = ((nextIndex % total) + total) % total;
          setActiveIndex(normalizedIndex);
        }
      }
    },
    [cardHeight, items.length, scrollY],
  );

  const onScroll = useMemo(
    () =>
      Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
          useNativeDriver: true,
          listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (items.length === 0) {
              return;
            }
            const offsetY = event.nativeEvent.contentOffset.y;
            const currentIndex = Math.round(offsetY / cardHeight);
            const total = items.length;
            const normalizedIndex = ((currentIndex % total) + total) % total;
            setActiveIndex(normalizedIndex);
          },
        },
      ),
    [scrollY, cardHeight, items.length],
  );

  return {
    activeIndex,
    scrollY,
    scrollRef,
    loopedItems,
    handleScrollEnd,
    onScroll,
  };
};
