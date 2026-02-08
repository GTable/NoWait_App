import { colors } from "@/app/styles/colors";
import styled from "@emotion/native";
import { CheckSvg } from "../assets/images";

interface CheckBoxProps {
  checked: boolean;
  onPress: () => void;
}

/**
 * 체크박스 컴포넌트 — checked 상태에 따라 활성/비활성 스타일 전환
 * @param checked - 체크 여부
 * @param onPress - 클릭 핸들러
 */
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
