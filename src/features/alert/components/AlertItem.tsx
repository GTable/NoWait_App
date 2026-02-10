import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import styled from "@emotion/native";

interface AlertItemProps {
  storeName: string;
  timeLeft: string;
  message: string;
  isRead?: boolean;
  onPress?: () => void;
}

/**
 * 알림 목록 아이템
 *
 * - 주점 프로필, 알림 시간, 메시지 표시
 * - 읽지 않은 알림은 배경색으로 구분
 */
export const AlertItem = ({
  storeName,
  timeLeft,
  message,
  isRead = true,
  onPress,
}: AlertItemProps) => {
  return (
    <E.Container onPress={onPress} style={!isRead ? E.UnreadBackground : undefined}>
      {/* 주점 프로필 및 알림 시간 */}
      <E.InfoRow>
        <E.StoreProfile>
          <E.ProfileImg />
          <E.StoreName>{storeName}</E.StoreName>
        </E.StoreProfile>

        <E.TimeLeft>{timeLeft}</E.TimeLeft>
      </E.InfoRow>

      {/* 알림 메시지 */}
      <E.MessageSection>
        <E.Message>{message}</E.Message>
      </E.MessageSection>
    </E.Container>
  );
};

const E = {
  Container: styled.Pressable({
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
    alignSelf: "stretch",
  }),
  UnreadBackground: {
    backgroundColor: "#FFF3F0",
  },

  InfoRow: styled.View({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignSelf: "stretch",
  }),

  StoreProfile: styled.View({
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  }),

  ProfileImg: styled.View({
    width: 22,
    height: 22,
    backgroundColor: colors.black[50],
    borderRadius: 999,
  }),

  StoreName: styled.Text({
    color: colors.black[60],
    ...typography["text-14-regular"],
  }),

  TimeLeft: styled.Text({
    color: colors.black[60],
    ...typography["text-14-regular"],
  }),

  MessageSection: styled.View({
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
  }),

  Message: styled.Text({
    color: colors.black[80],
    ...typography["text-16-medium"],
  }),
};
