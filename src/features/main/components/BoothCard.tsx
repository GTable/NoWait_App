import { colors } from "@/app/styles/colors";
import styled from "@emotion/native";
import React from "react";
import { Image } from "react-native";

/**
 * 가로 스크롤용 부스 카드 컴포넌트
 *
 * - 배너 이미지, 주점명, 학과, 대기 상태 표시
 * - 정렬된 주점 섹션에서 사용
 */
interface BoothCardProps {
  publicCode: string;
  name: string;
  departmentName: string;
  waitingCount: number;
  bannerImages?: string[];
  profileImage?: string;
  onPress?: () => void;
}

export const BoothCard = ({
  publicCode,
  name,
  departmentName,
  waitingCount,
  bannerImages,
  profileImage,
  onPress,
}: BoothCardProps) => {
  const waitStatusText =
    waitingCount === 0 ? "바로 입장 가능" : `대기 ${waitingCount}팀`;

  return (
    <E.Container onPress={onPress}>
      <E.BoothImage>
        {bannerImages && bannerImages[0] && (
          <E.BannerImage source={{ uri: bannerImages[0] }} resizeMode="cover" />
        )}
      </E.BoothImage>

      <E.InfoContainer>
        <E.TextContainer>
          <E.BoothName>{name}</E.BoothName>
          <E.DepartmentName>{departmentName}</E.DepartmentName>
        </E.TextContainer>

        <E.WaitStatusContainer>
          <E.ProfileIcon>
            {profileImage && (
              <E.ProfileImage
                source={{ uri: profileImage }}
                resizeMode="cover"
              />
            )}
          </E.ProfileIcon>
          <E.WaitStatusText>{waitStatusText}</E.WaitStatusText>
        </E.WaitStatusContainer>
      </E.InfoContainer>
    </E.Container>
  );
};

const E = {
  Container: styled.TouchableOpacity({
    width: 270,
    gap: 12,
  }),

  BoothImage: styled.View({
    width: 270,
    height: 180,
    borderRadius: 16,
    backgroundColor: colors.black[20],
    overflow: "hidden",
  }),

  BannerImage: styled(Image)({
    width: "100%",
    height: "100%",
  }),

  InfoContainer: styled.View({
    gap: 12,
  }),

  TextContainer: styled.View({
    gap: 2,
  }),

  BoothName: styled.Text({
    color: "#030303",
    fontFamily: "Pretendard",
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 26,
    letterSpacing: -0.18,
  }),

  DepartmentName: styled.Text({
    color: "#757575",
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: -0.14,
  }),

  WaitStatusContainer: styled.View({
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  }),

  ProfileIcon: styled.View({
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: colors.black[50],
    overflow: "hidden",
  }),

  ProfileImage: styled(Image)({
    width: "100%",
    height: "100%",
  }),

  WaitStatusText: styled.Text({
    color: "#757575",
    fontFamily: "Pretendard",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 13 * 1.44,
  }),
};
