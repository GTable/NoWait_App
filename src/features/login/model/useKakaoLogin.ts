import { useState } from "react";
import { login as loginKakaoNative } from "modules/kakao-login";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/config/routes/routes.core";
import { kakaoLogin } from "./LoginApi";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

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
      await kakaoLogin(kakaoAccessToken);

      // 로그인 성공 시 메인 페이지로 이동
      navigation.reset({
        index: 0,
        routes: [{ name: "Tabs" }],
      });
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
