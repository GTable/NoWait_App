import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/config/routes/routes.core";
import { useCallback, useState } from "react";
import { Keyboard } from "react-native";

/**
 * 회원가입 플로우 관리 훅
 * - 약관 동의 바텀시트 표시/숨김 처리
 * - 가입 완료 Success 모달 표시
 * - 가입 완료 후 3초 뒤 메인 화면으로 자동 이동
 */
export const useSignupFlow = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const handleNext = useCallback(() => {
    Keyboard.dismiss();
    setIsBottomSheetVisible(true);
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    setIsBottomSheetVisible(false);
  }, []);

  const handleConfirm = useCallback(() => {
    // 바텀시트 먼저 즉시 닫기
    setIsBottomSheetVisible(false);

    // 바텀시트가 화면에서 사라지도록 아주 짧은 딜레이 후 SuccessScreen 표시
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsSuccessModalVisible(true);
      });
    });

    // 3초 후 Main 화면으로 이동
    setTimeout(() => {
      setIsSuccessModalVisible(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "Tabs" }],
      });
    }, 3000);
  }, [navigation]);

  return {
    isBottomSheetVisible,
    isSuccessModalVisible,
    handleNext,
    handleCloseBottomSheet,
    handleConfirm,
  };
};
