import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/config/routes/routes.core";

type WaitingSuccessNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "WaitingSuccess"
>;

/**
 * 대기 등록 성공 화면 로직 관리 훅
 * - 확인 버튼 클릭 시 메인 탭으로 이동
 */
export const useWaitingSuccess = () => {
  const navigation = useNavigation<WaitingSuccessNavigationProp>();

  const handleConfirm = () => {
    // 홈 화면(메인 탭)으로 이동
    navigation.navigate("Tabs", { screen: "Main" });
  };

  return {
    handleConfirm,
  };
};
