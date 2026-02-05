import { ScreenLayout } from "@/app/layout/ScreenLayout";
import { PhoneNumberForm } from "@/features/phone_number/components/PhoneNumberForm";
import { TermsBottomSheet } from "@/features/phone_number/components/TermsBottomSheet";
import SuccessScreen from "@/features/phone_number/components/SuccessScreen";
import { usePhoneNumberForm } from "@/features/phone_number/hooks/usePhoneNumberForm";
import { useTermsAgreement } from "@/features/phone_number/hooks/useTermsAgreement";
import { useSignupFlow } from "@/features/phone_number/hooks/useSignupFlow";
import { Modal } from "react-native";

const PhoneNumberScreen = () => {
  const { phoneNumber, setPhoneNumber, handleClear, isPhoneNumberComplete } =
    usePhoneNumberForm();

  const {
    terms,
    allChecked,
    handleAllCheck,
    isRequiredTermsChecked,
    isMarketingAgreed,
  } = useTermsAgreement();

  const {
    isBottomSheetVisible,
    isSuccessModalVisible,
    handleNext,
    handleCloseBottomSheet,
    handleConfirm,
  } = useSignupFlow({ phoneNumber, consent: isMarketingAgreed });

  const onConfirm = () => {
    if (!isRequiredTermsChecked) return;
    handleConfirm();
  };

  return (
    <ScreenLayout>
      <PhoneNumberForm
        phoneNumber={phoneNumber}
        onChangeText={setPhoneNumber}
        onClear={handleClear}
        isComplete={isPhoneNumberComplete}
        onNext={handleNext}
      />

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
