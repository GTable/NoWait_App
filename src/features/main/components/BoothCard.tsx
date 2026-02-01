import { colors } from "@/app/styles/colors";
import styled from "@emotion/native";
import React from "react";
import { Image } from "react-native";

interface BoothCardProps {
  name: string;
  departmentName: string;
  waitingCount: number;
  bannerImages?: string[];
  profileImage?: string;
}

export const BoothCard = ({
  name,
  departmentName,
  waitingCount,
  bannerImages,
  profileImage,
}: BoothCardProps) => {
  const waitStatusText =
    waitingCount === 0 ? "바로 입장 가능" : `대기 ${waitingCount}팀`;

  return (
    <E.Container>
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
