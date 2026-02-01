import { SafeAreaView } from "react-native-safe-area-context";
import { ReactNode } from "react";
import { colors } from "../styles/colors";
import styled from "@emotion/native";

interface ScreenLayoutProps {
  children: ReactNode;
  /** 하단 SafeArea 적용 여부 (기본값: true) */
  bottomSafeArea?: boolean;
}

// 화면을 만들 때 SafeAreaView로 감싸주는 레이아웃 컴포넌트입니다.
export const ScreenLayout = ({
  children,
  bottomSafeArea = true,
}: ScreenLayoutProps) => {
  return (
    <E.MainLayout edges={bottomSafeArea ? undefined : ["top", "left", "right"]}>
      {children}
    </E.MainLayout>
  );
};

const E = {
  MainLayout: styled(SafeAreaView)({
    flex: 1,
    backgroundColor: colors.white[100],
  }),
};
