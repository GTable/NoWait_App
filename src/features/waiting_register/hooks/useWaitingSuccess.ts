import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/config/routes/routes.core";

type WaitingSuccessNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "WaitingSuccess"
>;

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
