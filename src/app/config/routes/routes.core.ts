import {
  NavigatorScreenParams,
  ParamListBase,
  RouteProp,
  useRoute,
} from "@react-navigation/native";
import z, { ZodType } from "zod";

/**
 * 앱 전체 라우트 타입 맵
 * (routes.app.d.ts에서 선언 병합으로 실제 키들이 채워짐)
 */
export interface AppRouteMap extends ParamListBase {}

// 헬퍼 타입
export type RouteName = keyof AppRouteMap;
export type RouteParams<T extends RouteName> = AppRouteMap[T];

type AnyRoute = RouteProp<Record<string, object | undefined>, string>;

/**
 * 앱 전체 라우트 타입 맵
 * (routes.app.d.ts에서 선언 병합으로 실제 키들이 채워짐)
 */
export function createRoute<
  Name extends string,
  Scheme extends ZodType<unknown>
>(name: Name, options: { path: string; params: Scheme }) {
  type Params = z.infer<Scheme>;

  function useParams(): Params {
    const route = useRoute<RouteProp<AppRouteMap, Name>>();
    return options.params.parse(route.params) as Params;
  }

  return {
    name,
    path: options.path,
    useParams,
  } as const;
}

// 네비게이터별 ParamList

// 바텀 탭에 들어가는 라우터 이름
export type BottomTabRouteName = "Main" | "Map" | "Search" | "MyPage";

// 바텀 탭 ParamList
export type BottomTabParamList = Pick<AppRouteMap, BottomTabRouteName>;

// roote stack ParamList
export type RootStackParamList = {
  Splash: AppRouteMap["Splash"];
  Tabs: NavigatorScreenParams<BottomTabParamList>;
  StoreDetail: AppRouteMap["StoreDetail"];
  Login: AppRouteMap["Login"];
  Search: AppRouteMap["Search"];
};
