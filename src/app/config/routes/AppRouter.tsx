import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabParamList, RootStackParamList } from "./routes.core";
import MainScreen from "@/screens/main/MainScreen";
import SearchScreen from "@/screens/search/SearchScreen";
import MapScreen from "@/screens/map/MapScreen";
import MyPageScreen from "@/screens/mypage/MyPageScreen";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "@/screens/splash/SplashScreen";
import LoginScreen from "@/screens/login/LoginScreen";
import StoreDetailScreen from "@/screens/store_detail/StoreDetailScreen";
import NoticeDetailScreen from "@/screens/store_detail/NoticeDetailScreen";
import { View } from "react-native";
import { CustomBottomTab } from "@/shared/ui/CustomBottomTab";
import PhoneNumberScreen from "@/screens/phone_number/PhoneNumberScreen";
import EnterPersonScreen from "@/screens/waiting_register/EnterPersonScreen";
import ConfirmWaitingScreen from "@/screens/waiting_register/ConfirmWaitingScreen";
import WaitingSuccessScreen from "@/screens/waiting_register/WaitingSuccessScreen";
import { ModalProvider } from "@/shared/contexts/ModalContext";

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <ModalProvider>
      <BottomTab.Navigator
        tabBar={(props) => <CustomBottomTab {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <BottomTab.Screen name="Main" component={MainScreen} />
        <BottomTab.Screen name="Search" component={SearchScreen} />
        <BottomTab.Screen name="Map" component={MapScreen} />
        <BottomTab.Screen name="MyPage" component={MyPageScreen} />
      </BottomTab.Navigator>
    </ModalProvider>
  );
};

export function AppRouter() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Stack.Navigator initialRouteName="Splash">
          {/* 스플래시 화면 */}
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          {/* 로그인 화면 */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false, animation: "none" }}
          />
          {/* 메인 탭 네비게이터 (홈, 검색, 지도, 마이페이지) */}
          <Stack.Screen
            name="Tabs"
            component={BottomTabNavigator}
            options={{ headerShown: false, animation: "none" }}
          />
          {/* 검색 화면 */}
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ headerShown: false }}
          />
          {/* 주점 상세 화면 */}
          <Stack.Screen
            name="StoreDetail"
            component={StoreDetailScreen}
            options={{ headerShown: false }}
          />
          {/* 공지사항 상세 화면 */}
          <Stack.Screen
            name="NoticeDetail"
            component={NoticeDetailScreen}
            options={{ headerShown: false }}
          />
          {/* 전화번호 입력 화면 */}
          <Stack.Screen
            name="PhoneNumber"
            component={PhoneNumberScreen}
            options={{ headerShown: false }}
          />
          {/* 대기 등록: 인원 입력 */}
          <Stack.Screen
            name="EnterPerson"
            component={EnterPersonScreen}
            options={{ headerShown: false }}
          />
          {/* 대기 등록: 2차 확인 */}
          <Stack.Screen
            name="ConfirmWaiting"
            component={ConfirmWaitingScreen}
            options={{ headerShown: false }}
          />
          {/* 대기 등록: 성공 화면 */}
          <Stack.Screen
            name="WaitingSuccess"
            component={WaitingSuccessScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}
