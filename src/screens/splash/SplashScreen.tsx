import { colors } from "@/app/styles/colors";
import { Images } from "@/shared/assets/images";
import styled from "@emotion/native";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

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

    // 폰트 로드 완료 후 2초 대기 후 화면 이동
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" as never }],
      });
    }, 2000);

    return () => clearTimeout(timer);
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
