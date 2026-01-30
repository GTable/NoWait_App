export const typography = {
  // Heading
  "h1-20-bold": {
    fontSize: 20,
    lineHeight: 20 * 1.36,
    letterSpacing: 20 * -0.02,
    fontWeight: "700" as const,
    fontFamily: "Pretendard-Bold",
  },

  // Headline
  "headline-28-bold": {
    fontSize: 28,
    lineHeight: 28 * 1.36,
    letterSpacing: 0,
    fontWeight: "700" as const,
    fontFamily: "Pretendard-Bold",
  },
  "headline-24-bold": {
    fontSize: 24,
    lineHeight: 24 * 1.36,
    letterSpacing: 0,
    fontWeight: "700" as const,
    fontFamily: "Pretendard-Bold",
  },
  "headline-22-bold": {
    fontSize: 22,
    lineHeight: 22 * 1.36,
    letterSpacing: 22 * -0.01,
    fontWeight: "700" as const,
    fontFamily: "Pretendard-Bold",
  },

  // Title
  "title-20-bold": {
    fontSize: 20,
    lineHeight: 20 * 1.36,
    letterSpacing: 20 * -0.01,
    fontWeight: "700" as const,
    fontFamily: "Pretendard-Bold",
  },
  "title-20-semibold": {
    fontSize: 20,
    lineHeight: 20 * 1.36,
    letterSpacing: 0,
    fontWeight: "600" as const,
    fontFamily: "Pretendard-SemiBold",
  },
  "title-18-bold": {
    fontSize: 18,
    lineHeight: 18 * 1.36,
    letterSpacing: 0,
    fontWeight: "700" as const,
    fontFamily: "Pretendard-Bold",
  },
  "title-18-semibold": {
    fontSize: 18,
    lineHeight: 18 * 1.36,
    letterSpacing: 0,
    fontWeight: "600" as const,
    fontFamily: "Pretendard-SemiBold",
  },
  "title-16-bold": {
    fontSize: 16,
    lineHeight: 16 * 1.36,
    letterSpacing: 0,
    fontWeight: "700" as const,
    fontFamily: "Pretendard-Bold",
  },
  "title-16-semibold": {
    fontSize: 16,
    lineHeight: 16 * 1.44,
    letterSpacing: 0,
    fontWeight: "600" as const,
    fontFamily: "Pretendard-SemiBold",
  },
  "title-14-semibold": {
    fontSize: 14,
    lineHeight: 14 * 1.44,
    letterSpacing: 0,
    fontWeight: "600" as const,
    fontFamily: "Pretendard-SemiBold",
  },

  // Text
  "text-16-medium": {
    fontSize: 16,
    lineHeight: 16 * 1.44,
    letterSpacing: 16 * -0.01,
    fontWeight: "500" as const,
    fontFamily: "Pretendard-Medium",
  },
  "text-16-regular": {
    fontSize: 16,
    lineHeight: 16 * 1.44,
    letterSpacing: 16 * -0.01,
    fontWeight: "400" as const,
    fontFamily: "Pretendard-Regular",
  },
  "text-15-semibold": {
    fontSize: 15,
    lineHeight: 15 * 1.44,
    letterSpacing: 0,
    fontWeight: "600" as const,
    fontFamily: "Pretendard-SemiBold",
  },
  "text-15-medium": {
    fontSize: 15,
    lineHeight: 15 * 1.44,
    letterSpacing: 0,
    fontWeight: "500" as const,
    fontFamily: "Pretendard-Medium",
  },
  "text-15-regular": {
    fontSize: 15,
    lineHeight: 15 * 1.44,
    letterSpacing: 0,
    fontWeight: "400" as const,
    fontFamily: "Pretendard-Regular",
  },
  "text-14-medium": {
    fontSize: 14,
    lineHeight: 14 * 1.44,
    letterSpacing: 0,
    fontWeight: "500" as const,
    fontFamily: "Pretendard-Medium",
  },
  "text-14-regular": {
    fontSize: 14,
    lineHeight: 14 * 1.44,
    letterSpacing: 0,
    fontWeight: "400" as const,
    fontFamily: "Pretendard-Regular",
  },
  "text-13-regular": {
    fontSize: 13,
    lineHeight: 13 * 1.44,
    letterSpacing: 0,
    fontWeight: "400" as const,
    fontFamily: "Pretendard-Regular",
  },
  "text-12-semibold": {
    fontSize: 12,
    lineHeight: 12 * 1.44,
    letterSpacing: 0,
    fontWeight: "600" as const,
    fontFamily: "Pretendard-SemiBold",
  },
  "text-12-medium": {
    fontSize: 12,
    lineHeight: 12 * 1.44,
    letterSpacing: 0,
    fontWeight: "500" as const,
    fontFamily: "Pretendard-Medium",
  },

  // Button
  "button-17-semibold": {
    fontSize: 17,
    lineHeight: 17 * 1.4,
    letterSpacing: 0,
    fontWeight: "600" as const,
    fontFamily: "Pretendard-SemiBold",
  },
  "button-18-semibold": {
    fontSize: 18,
    lineHeight: 18 * 1.36,
    letterSpacing: 0,
    fontWeight: "600" as const,
    fontFamily: "Pretendard-SemiBold",
  },
} as const;

export type TypographyType = keyof typeof typography;
