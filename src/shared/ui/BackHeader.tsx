import styled from "@emotion/native";
import { ArrowLeftSvg } from "../assets/images";
import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";

interface BackHeaderProps {
  title?: string;
  onPress?: () => void;
}

export const BackHeader = ({ title, onPress }: BackHeaderProps) => {
  return (
    <E.Header>
      <E.Left onPress={onPress}>
        <ArrowLeftSvg />
      </E.Left>

      {title && <E.Title>{title}</E.Title>}

      <E.Right />
    </E.Header>
  );
};

const E = {
  Header: styled.View({
    width: "100%",
    height: 48,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  }),

  Left: styled.TouchableOpacity({
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  }),

  Title: styled.Text({
    color: colors.black[90],
    textAlign: "center",
    ...typography["title-18-semibold"],
  }),

  Right: styled.View({
    width: 48,
    height: 48,
    flexShrink: 0,
  }),
};
