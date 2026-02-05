import { colors } from "@/app/styles/colors";
import { Images } from "@/shared/assets/images";
import styled from "@emotion/native";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/config/routes/routes.core";
import * as SecureStore from "expo-secure-store";

const SplashScreen = () => {
  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("../../../assets/fonts/Pretendard-Bold.otf"),
    "Pretendard-SemiBold": require("../../../assets/fonts/Pretendard-SemiBold.otf"),
    "Pretendard-Medium": require("../../../assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-Regular": require("../../../assets/fonts/Pretendard-Regular.otf"),
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (!fontsLoaded) return;

    let isMounted = true;

    const checkAuthAndNavigate = async () => {
      try {
        const accessToken = await SecureStore.getItemAsync("accessToken");

        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (!isMounted) return;

        if (accessToken) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Tabs" }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }
      } catch (error) {
        console.error("토큰 확인 중 오류:", error);
        if (!isMounted) return;

        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
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
    aspectRatio: 2.5,
    resizeMode: "cover",
  }),
};
