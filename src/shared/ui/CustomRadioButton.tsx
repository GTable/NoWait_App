import { colors } from "@/app/styles/colors";
import styled from "@emotion/native";

interface RadioButtonProps {
  checked: boolean;
  onPress: () => void;
}

/**
 * 라디오 버튼 컴포넌트 — checked 상태에 따라 활성/비활성 스타일 전환
 * @param checked - 선택 여부
 * @param onPress - 클릭 핸들러
 */
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
