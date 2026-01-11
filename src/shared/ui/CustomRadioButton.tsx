import { colors } from "@/app/styles/colors";
import styled from "@emotion/native";

interface RadioButtonProps {
  checked: boolean;
  onPress: () => void;
}

export const RadioButton = ({ checked, onPress }: RadioButtonProps) => {
  const Container = checked ? E.ActiveContainer : E.Container;

  return <Container onPress={onPress}>{checked && <E.ActiveCircle />}</Container>;
};

const E = {
  Container: styled.TouchableOpacity({
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: colors.black[35],
    backgroundColor: colors.white[100],
  }),

  ActiveContainer: styled.TouchableOpacity({
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: colors.black[100],
    backgroundColor: colors.white[100],
  }),

  ActiveCircle: styled.View({
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: colors.black[100],
  }),
};
