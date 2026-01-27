import LoginScreen from "@/screens/login/LoginScreen";
import MainScreen from "@/screens/main/MainScreen";
import MapScreen from "@/screens/map/MapScreen";
import MyPageScreen from "@/screens/mypage/MyPageScreen";
import SearchScreen from "@/screens/search/SearchScreen";
import SplashScreen from "@/screens/splash/SplashScreen";
import StoreDetailScreen from "@/screens/store_detail/StoreDetailScreen";

declare module "./routes.core" {
  interface AppRouteMap {
    splash: ReturnType<typeof SplashScreen.useParams>;
    login: ReturnType<typeof LoginScreen.useParams>;
    main: ReturnType<typeof MainScreen.useParams>;
    search: ReturnType<typeof SearchScreen.useParams>;
    map: ReturnType<typeof MapScreen.useParams>;
    myPage: ReturnType<typeof MyPageScreen.useParams>;
    storeDetail: ReturnType<typeof StoreDetailScreen.useParams>;
    phoneNumber: ReturnType<typeof PhoneNumberScreen.useParams>;
  }
}
