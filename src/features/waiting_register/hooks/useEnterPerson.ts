import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/config/routes/routes.core";
import { useState } from "react";

interface UseEnterPersonParams {
  publicCode: string;
}

/**
 * 인원 입력 화면 로직 관리 훅
 * - 인원수 상태 관리
 * - 뒤로가기 및 다음 단계 네비게이션 처리
 */
export const useEnterPerson = ({ publicCode }: UseEnterPersonParams) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [partySize, setPartySize] = useState(1);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    navigation.navigate("ConfirmWaiting", {
      publicCode,
      partySize,
    });
  };

  return {
    partySize,
    setPartySize,
    handleBack,
    handleNext,
  };
};
