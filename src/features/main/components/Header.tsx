import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/config/routes/routes.core";
import { Logo } from "@/shared/assets/images";
import { Alert } from "@/shared/assets/images/main/Alert";
import styled from "@emotion/native";

/**
 * 메인 화면 상단 헤더
 *
 * - 로고 및 알림 버튼 표시
 */
export const Header = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <E.Container>
      <Logo />
      <E.AlertButton onPress={() => navigation.navigate("Alert")}>
        <Alert />
      </E.AlertButton>
    </E.Container>
  );
};

const E = {
  Container: styled.View({
    flexDirection: "row",
    height: 56,
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: "space-between",
    alignItems: "flex-start",
  }),

  AlertButton: styled.TouchableOpacity({
    width: 24,
    height: 24,
  }),
};
