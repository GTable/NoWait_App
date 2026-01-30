import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/config/routes/routes.core";

interface UseConfirmWaitingProps {
  publicCode: string;
}

type ConfirmWaitingNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ConfirmWaiting"
>;

export const useConfirmWaiting = ({ publicCode }: UseConfirmWaitingProps) => {
  const navigation = useNavigation<ConfirmWaitingNavigationProp>();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRegister = async () => {
    try {
      // TODO: 대기 등록 API 호출
      console.log("대기 등록:", { publicCode });

      // 성공 시 성공 화면으로 이동
      navigation.navigate("WaitingSuccess", { publicCode });
    } catch (error) {
      console.error("대기 등록 실패:", error);
      // TODO: 에러 처리
    }
  };

  return {
    handleBack,
    handleRegister,
  };
};
