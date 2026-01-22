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

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() {
  return (
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
  );
}

export function AppRouter() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false, animation: "none" }}
          />
          <Stack.Screen
            name="Tabs"
            component={BottomTabNavigator}
            options={{ headerShown: false, animation: "none" }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StoreDetail"
            component={StoreDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NoticeDetail"
            component={NoticeDetailScreen}
            options={{ headerShown: false, presentation: "modal" }}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}
