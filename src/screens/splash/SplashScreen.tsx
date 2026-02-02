import { colors } from "@/app/styles/colors";
import { Images } from "@/shared/assets/images";
import styled from "@emotion/native";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const SplashScreen = () => {
  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("../../../assets/fonts/Pretendard-Bold.otf"),
    "Pretendard-SemiBold": require("../../../assets/fonts/Pretendard-SemiBold.otf"),
    "Pretendard-Medium": require("../../../assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-Regular": require("../../../assets/fonts/Pretendard-Regular.otf"),
  });

  const navigation = useNavigation();

  useEffect(() => {
    if (!fontsLoaded) return;

    let isMounted = true;

    // 폰트 로드 완료 후 토큰 확인하여 화면 이동
    const checkAuthAndNavigate = async () => {
      try {
        const accessToken = await SecureStore.getItemAsync("accessToken");

        // 2초 대기 (스플래시 화면 표시)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // unmount된 경우 navigation 실행하지 않음
        if (!isMounted) return;

        if (accessToken) {
          // 토큰이 있으면 메인 화면으로
          navigation.reset({
            index: 0,
            routes: [{ name: "Tabs" as never }],
          });
        } else {
          // 토큰이 없으면 로그인 화면으로
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" as never }],
          });
        }
      } catch (error) {
        console.error("토큰 확인 중 오류:", error);
        // unmount된 경우 navigation 실행하지 않음
        if (!isMounted) return;

        // 오류 발생 시 로그인 화면으로
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" as never }],
        });
      }
    };

    checkAuthAndNavigate();

    return () => {
      isMounted = false;
    };
  }, [fontsLoaded, navigation]);

  return (
    <E.Container>
      <E.Image source={Images["splash-logo"]} />
    </E.Container>
  );
};

export default SplashScreen;

const E = {
  Container: styled.View({
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  }),

  Image: styled.Image({
    width: "35%",
    height: undefined,
    // 너비가 변해도 자동으로 비율에 맞춘 높이를 계산해줌!
    aspectRatio: 2.5,
    resizeMode: "cover",
  }),
};
