import { colors } from "@/app/styles/colors";
import styled from "@emotion/native";
import React from "react";

interface CarouselIndicatorProps {
  /** 전체 도트 개수 */
  total: number;
  /** 현재 활성화된 인덱스 (0부터 시작) */
  activeIndex: number;
  /** 도트 방향 */
  direction?: "row" | "column";
}

/**
 * 캐러셀 페이지 인디케이터 — 활성 도트를 넓게 표시
 * @param total - 전체 도트 개수
 * @param activeIndex - 현재 활성 인덱스
 */
export const CarouselIndicator = ({
  total,
  activeIndex,
  direction = "row",
}: CarouselIndicatorProps) => {
  return (
    <E.Container style={{ flexDirection: direction }}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;
        if (direction === "column") {
          return (
            <E.VerticalDot
              key={index}
              style={{
                backgroundColor: isActive ? "#FF7649" : "rgba(0, 0, 0, 0.15)",
              }}
            />
          );
        }

        return isActive ? <E.ActiveDot key={index} /> : <E.NormalDot key={index} />;
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
  VerticalDot: styled.View({
    width: 4,
    height: 4,
    borderRadius: 999,
  }),

  Container: styled.View({
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  }),
};
