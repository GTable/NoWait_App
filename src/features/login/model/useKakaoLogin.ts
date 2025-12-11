import { useState } from "react";
import { login as loginKakaoNative } from "modules/kakao-login";

export const useKakaoLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const handleKakaoLogin = async () => {
    try {
      setIsLoading(true);

      const accessToken = await loginKakaoNative();

      console.log("Kakao Login Success, Access Token:", accessToken);
      setToken(accessToken);
    } catch (e: any) {
      console.error("Kakao Login Failed:", e.message);
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
