import { SafeAreaView } from "react-native-safe-area-context";
import { ReactNode } from "react";
import { colors } from "../styles/colors";

interface ScreenLayoutProps {
  children: ReactNode;
}

// 화면을 만들 때 SafeAreaView로 감싸주는 레이아웃 컴포넌트입니다.
export const ScreenLayout = ({ children }: ScreenLayoutProps) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white[100] }}>
      {children}
    </SafeAreaView>
  );
};
