import { ScreenLayout } from "@/app/layout/ScreenLayout";
import { PhoneNumberForm } from "@/features/phone_number/components/PhoneNumberForm";
import { TermsBottomSheet } from "@/features/phone_number/components/TermsBottomSheet";
import SuccessScreen from "@/features/phone_number/components/SuccessScreen";
import { usePhoneNumberForm } from "@/features/phone_number/hooks/usePhoneNumberForm";
import { useTermsAgreement } from "@/features/phone_number/hooks/useTermsAgreement";
import { useSignupFlow } from "@/features/phone_number/hooks/useSignupFlow";
import { Modal } from "react-native";

const PhoneNumberScreen = () => {
  // 전화번호 입력 상태 관리
  const { phoneNumber, setPhoneNumber, handleClear, isPhoneNumberComplete } =
    usePhoneNumberForm();

  // 약관 동의 상태 관리
  const { terms, allChecked, handleAllCheck, isRequiredTermsChecked, isMarketingAgreed } =
    useTermsAgreement();

  // 회원가입 플로우 관리 (바텀시트, Success 모달, 네비게이션)
  const {
    isBottomSheetVisible,
    isSuccessModalVisible,
    handleNext,
    handleCloseBottomSheet,
    handleConfirm,
  } = useSignupFlow({ phoneNumber, consent: isMarketingAgreed });

  // 필수 약관 체크 후 확인 처리
  const onConfirm = () => {
    if (!isRequiredTermsChecked) return;
    handleConfirm();
  };

  return (
    <ScreenLayout>
      {/* 전화번호 입력 폼 */}
      <PhoneNumberForm
        phoneNumber={phoneNumber}
        onChangeText={setPhoneNumber}
        onClear={handleClear}
        isComplete={isPhoneNumberComplete}
        onNext={handleNext}
      />

      {/* 약관 동의 바텀시트 */}
      <TermsBottomSheet
        visible={isBottomSheetVisible}
        terms={terms}
        allChecked={allChecked}
        onAllCheckPress={handleAllCheck}
        onConfirm={onConfirm}
        isConfirmEnabled={isRequiredTermsChecked}
        onClose={handleCloseBottomSheet}
      />

      {/* 가입 완료 모달 */}
      <Modal visible={isSuccessModalVisible} animationType="none">
        <SuccessScreen />
      </Modal>
    </ScreenLayout>
  );
};

export default PhoneNumberScreen;
