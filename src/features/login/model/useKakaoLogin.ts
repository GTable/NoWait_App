import { useState } from "react";
import { login as loginKakaoNative } from "modules/kakao-login";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/config/routes/routes.core";
import { kakaoLogin } from "./LoginApi";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * 카카오 로그인 플로우 관리 훅
 * - 카카오 네이티브 SDK로 액세스 토큰 획득
 * - 서버 로그인 처리 및 토큰 저장
 * - 신규 사용자는 전화번호 입력 화면으로, 기존 사용자는 메인 화면으로 이동
 */
export const useKakaoLogin = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const handleKakaoLogin = async () => {
    try {
      setIsLoading(true);

      // 카카오 네이티브 로그인으로 accessToken 받기
      const kakaoAccessToken = await loginKakaoNative();
      setToken(kakaoAccessToken);

      // 서버에 로그인 요청 및 토큰 저장
      const response = await kakaoLogin(kakaoAccessToken);

      // 신규 사용자: 전화번호 입력 페이지로 이동
      // 기존 사용자: 메인 페이지로 이동
      if (response.response.newUser) {
        navigation.reset({
          index: 0,
          routes: [{ name: "PhoneNumber" }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Tabs" }],
        });
      }
    } catch (e: any) {
      console.error("Login Failed:", e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleKakaoLogin,
    isLoading,
    token,
  };
};
