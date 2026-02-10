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

export const AlertItem = ({
  storeName,
  timeLeft,
  message,
  isRead = true,
  onPress,
}: AlertItemProps) => {
  return (
    <E.Container onPress={onPress} style={!isRead ? E.UnreadBackground : undefined}>
      <E.Top>
        <E.TopLeft>
          <E.ProfileImg />
          <E.StoreName>{storeName}</E.StoreName>
        </E.TopLeft>

        <E.TimeLeft>{timeLeft}</E.TimeLeft>
      </E.Top>

      <E.Bottom>
        <E.Message>{message}</E.Message>
      </E.Bottom>
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

  Top: styled.View({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignSelf: "stretch",
  }),

  TopLeft: styled.View({
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

  Bottom: styled.View({
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
  }),

  Message: styled.Text({
    color: colors.black[80],
    ...typography["text-16-medium"],
  }),
};
