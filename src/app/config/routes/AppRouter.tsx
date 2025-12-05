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
import { View } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{ headerShown: false }}
      />
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
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tabs"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StoreDetail"
            component={StoreDetailScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}
