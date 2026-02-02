import { colors } from "@/app/styles/colors";
import { XCircleSvg } from "@/shared/assets/images";
import { formatPhoneNumber } from "@/shared/utils/formatPhoneNumber";
import styled from "@emotion/native";

/**
 * 전화번호 입력 필드 컴포넌트
 * - 자동 하이픈 포맷팅 (010-1234-5678)
 * - 입력값 초기화 버튼
 */
interface PhoneNumberInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export const PhoneNumberInput = ({
  value,
  onChangeText,
  onClear,
}: PhoneNumberInputProps) => {
  const handleChangeText = (text: string) => {
    onChangeText(formatPhoneNumber(text));
  };

  return (
    <E.InputContainer>
      <E.Input
        placeholder="전화번호 입력"
        placeholderTextColor={colors.black[50]}
        value={value}
        onChangeText={handleChangeText}
        keyboardType="phone-pad"
        maxLength={13}
      />
      {value.length > 0 && (
        <E.InputButton onPress={onClear}>
          <XCircleSvg />
        </E.InputButton>
      )}
    </E.InputContainer>
  );
};

const E = {
  InputContainer: styled.View({
    width: "100%",
    flexDirection: "row",
    height: 60,
    paddingHorizontal: 14,
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: colors.black[15],
  }),

  Input: styled.TextInput({
    flex: 1,
    color: colors.black[90],
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "600",
    letterSpacing: -0.2,
  }),

  InputButton: styled.TouchableOpacity({
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  }),
};
