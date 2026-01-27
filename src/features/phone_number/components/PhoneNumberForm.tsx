import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { PhoneNumberInput } from "@/features/phone_number/components/PhoneNumberInput";
import { CustomButton } from "@/shared/ui/CustomButton";
import styled from "@emotion/native";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

interface PhoneNumberFormProps {
  phoneNumber: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  isComplete: boolean;
  onNext: () => void;
}

export const PhoneNumberForm = ({
  phoneNumber,
  onChangeText,
  onClear,
  isComplete,
  onNext,
}: PhoneNumberFormProps) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <E.Container>
          <E.Title numberOfLines={2}>
            전화번호를 알려주세요{"\n"}
            호출 시에 필요해요
          </E.Title>

          <PhoneNumberInput
            value={phoneNumber}
            onChangeText={onChangeText}
            onClear={onClear}
          />
        </E.Container>
      </TouchableWithoutFeedback>

      {isComplete && (
        <E.CtaContainer>
          <CustomButton variant="rounded12" onPress={onNext}>
            다음으로
          </CustomButton>
        </E.CtaContainer>
      )}
    </KeyboardAvoidingView>
  );
};

const E = {
  Container: styled.View({
    flex: 1,
    flexDirection: "column",
    width: "100%",
    paddingTop: 54,
    paddingHorizontal: 20,
    gap: 30,
  }),

  Title: styled.Text({
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "stretch",
    color: colors.black[100],
    ...typography["headline-24-bold"],
  }),

  CtaContainer: styled.View({
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 32,
    justifyContent: "center",
    alignItems: "center",
  }),
};
