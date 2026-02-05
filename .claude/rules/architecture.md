# 아키텍처 가이드

## 새 화면 추가 방법

### 1. Screen 파일 생성

`src/screens/[screen_name]/[ScreenName]Screen.tsx` 형식. 반드시 `ScreenLayout`으로 감싸기.

```tsx
import { ScreenLayout } from "@/app/layout/ScreenLayout";

const ExampleScreen = () => {
  return (
    <ScreenLayout>
      {/* 화면 내용 */}
    </ScreenLayout>
  );
};

export default ExampleScreen;
```

### 2. 라우트 타입 정의

`src/app/config/routes/routes.app.d.ts`에 선언 병합:

```typescript
declare module "./routes.core" {
  export interface AppRouteMap {
    Example: undefined;           // 파라미터 없는 경우
    Example: { id: string };      // 파라미터 있는 경우
  }
}
```

### 3. AppRouter에 등록

`src/app/config/routes/AppRouter.tsx`에 추가:

```tsx
// 탭바 없는 화면
<Stack.Screen name="Example" component={ExampleScreen} options={{ headerShown: false }} />

// 탭바 있는 화면 → BottomTabNavigator 내부에 추가 + routes.core.ts의 BottomTabRouteName에 추가
```

### 4. Zod 라우트 파라미터 (선택)

타입 안전한 `useParams()`가 필요한 경우 `createRoute` 헬퍼 사용:

```typescript
import { createRoute } from "@/app/config/routes/routes.core";
import { z } from "zod";

export const ExampleRoute = createRoute("Example", {
  path: "example",
  params: z.object({ id: z.string() }),
});

// 사용: const { id } = ExampleRoute.useParams();
```

## 새 기능 추가 방법

`screens/`와 1:1 대응하는 `src/features/[name]/` 생성:

```
features/[name]/
├── components/    # 해당 기능의 UI 컴포넌트
├── hooks/         # 커스텀 훅 (use~ 파일은 반드시 여기에 배치)
└── model/         # API 함수 + Zod 응답 스키마 (훅 아닌 순수 함수만)
```

IMPORTANT: `use~`로 시작하는 커스텀 훅은 반드시 `hooks/`에 배치. `model/`에는 API 함수와 Zod 스키마만 둔다.

## 화면 이동

```tsx
import { useNavigation } from "@react-navigation/native";

const navigation = useNavigation();
navigation.navigate("Example");                    // 기본 이동
navigation.navigate("Example", { id: "123" });     // 파라미터와 함께
navigation.goBack();                               // 뒤로 가기
navigation.reset({ index: 0, routes: [{ name: "Login" }] });  // 스택 초기화
```

## API 함수 패턴

모든 API 함수는 다음 구조를 따른다:

```typescript
// model/ExampleApi.ts

// 1. Zod 스키마 정의 (필수)
const ExampleResponseSchema = z.object({
  success: z.boolean(),
  response: z.object({ id: z.number(), name: z.string() }),
});

// 2. 반환 타입 interface
export interface Example {
  id: number;
  name: string;
}

// 3. JSDoc + API 함수 (반환 타입 명시 필수)
/**
 * 예시 데이터 조회 API
 * @param id - 조회할 ID
 * @returns 예시 데이터
 */
export const getExample = async (id: string): Promise<Example | null> => {
  const raw = await storeApi.get(`/${id}`);
  const response = ExampleResponseSchema.parse(raw);  // Zod 검증 필수
  return response.response;
};
```

IMPORTANT: `as` 타입 캐스팅 대신 반드시 Zod `.parse()`로 응답 검증. 인터셉터가 `response.data`를 추출하므로 raw 직접 사용.

## 커스텀 훅 패턴

### 서버 상태 vs 로컬 상태 기준

- **서버에서 가져오는 데이터** → React Query (`useQuery`, `useInfiniteQuery`)
- **입력값, UI 상태** → `useState`
- **로컬 저장소 데이터** → `useState` + AsyncStorage

```typescript
// hooks/useExample.ts
export const useExample = (id: string) => {
  return useQuery({ queryKey: ["example", id], queryFn: () => getExample(id) });
};
```

### useEffect 내 비동기 처리

race condition 방지를 위해 `isCanceled` 플래그 + cleanup 반환 패턴 사용:

```typescript
useEffect(() => {
  let isCanceled = false;

  fetchData(keyword).then((data) => {
    if (isCanceled) return;  // 컴포넌트 언마운트 후 상태 갱신 방지
    setData(data);
  });

  return () => { isCanceled = true; };
}, [keyword]);
```

### 타이머 정리

`setTimeout`/`setInterval` 사용 시 `useRef` + `useEffect` cleanup:

```typescript
const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

useEffect(() => {
  return () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };
}, []);
```
