import { colors } from "@/app/styles/colors";
import styled from "@emotion/native";
import React from "react";

interface CarouselIndicatorProps {
  /** 전체 도트 개수 */
  total: number;
  /** 현재 활성화된 인덱스 (0부터 시작) */
  activeIndex: number;
}

/**
 * 캐러셀 페이지 인디케이터 — 활성 도트를 넓게 표시
 * @param total - 전체 도트 개수
 * @param activeIndex - 현재 활성 인덱스
 */
export const CarouselIndicator = ({
  total,
  activeIndex,
}: CarouselIndicatorProps) => {
  return (
    <E.Container>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;
        return isActive ? (
          <E.ActiveDot key={index} />
        ) : (
          <E.NormalDot key={index} />
        );
      })}
    </E.Container>
  );
};

const E = {
  // 기본 상태 도트 입니다.
  NormalDot: styled.View({
    width: 5,
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.black[50],
  }),
  // 활성화 된 상태 도트 입니다.
  ActiveDot: styled.View({
    width: 12,
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.black[100],
  }),

  Container: styled.View({
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  }),
};
