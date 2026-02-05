import { useState, useRef, useEffect } from "react";
import { login as loginKakaoNative } from "modules/kakao-login";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/config/routes/routes.core";
import { kakaoLogin } from "../model/LoginApi";

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
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const handleKakaoLogin = async () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setShowToast(false);

    try {
      const kakaoAccessToken = await loginKakaoNative();
      setToken(kakaoAccessToken);

      setIsLoading(true);

      try {
        const response = await kakaoLogin(kakaoAccessToken);

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
      } catch (apiError: unknown) {
        setShowToast(true);

        toastTimer.current = setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    } catch (e: unknown) {
      // 사용자가 카카오 로그인을 취소한 경우
    }
  };

  return {
    handleKakaoLogin,
    isLoading,
    token,
    showToast,
  };
};
