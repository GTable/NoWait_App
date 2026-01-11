import { colors } from "@/app/styles/colors";
import styled from "@emotion/native";
import { CheckSvg } from "../assets/images";

interface CheckBoxProps {
  checked: boolean;
  onPress: () => void;
}

export const CheckBox = ({ checked, onPress }: CheckBoxProps) => {
  const Container = checked ? E.ActiveContainer : E.Container;

  return <Container onPress={onPress}>{checked && <CheckSvg />}</Container>;
};

const E = {
  Container: styled.TouchableOpacity({
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5.5,
    borderWidth: 0.92,
    borderColor: colors.black[30],
    backgroundColor: colors.white[100],
  }),

  ActiveContainer: styled.TouchableOpacity({
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5.5,
    backgroundColor: colors.black[100],
  }),
};
