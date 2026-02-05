# 아키텍처 가이드

## 새 화면 추가 체크리스트

**1. 파일 생성:** `src/screens/[name]/[Name]Screen.tsx`

```tsx
const ExampleScreen = () => <ScreenLayout>{/* 내용 */}</ScreenLayout>;
export default ExampleScreen;
```

**2. 타입 추가:** `routes.app.d.ts`

```typescript
declare module "./routes.core" {
  export interface AppRouteMap {
    Example: undefined; // 또는 { id: string }
  }
}
```

**3. 라우트 등록:** `AppRouter.tsx`

```tsx
<Stack.Screen
  name="Example"
  component={ExampleScreen}
  options={{ headerShown: false }}
/>
```

**4. Zod 파라미터 (선택):**

```typescript
export const ExampleRoute = createRoute("Example", {
  path: "example",
  params: z.object({ id: z.string() }),
});
// 사용: const { id } = ExampleRoute.useParams();
```

## 새 기능 추가

```
src/features/[name]/
├── components/    # UI 컴포넌트
├── hooks/         # use~ 훅 (반드시 여기 배치)
└── model/         # API 함수 + Zod 스키마 (훅 금지)
```

**주의:** `model/`에는 순수 함수만, 훅은 `hooks/`에

## 네비게이션

```tsx
const navigation = useNavigation();
navigation.navigate("Example"); // 이동
navigation.navigate("Example", { id: "123" }); // 파라미터
navigation.goBack(); // 뒤로
navigation.reset({ index: 0, routes: [{ name: "Login" }] }); // 스택 초기화
```

## API 함수 템플릿

```typescript
// model/StoreApi.ts
const StoreSchema = z.object({
  success: z.boolean(),
  response: z.object({ id: z.number(), name: z.string() }),
});

export interface Store {
  id: number;
  name: string;
}

/**
 * 주점 정보 조회
 * @param id - 주점 ID
 */
export const getStore = async (id: string): Promise<Store | null> => {
  try {
    const raw = await storeApi.get(`/${id}`);
    const validated = StoreSchema.parse(raw);
    return validated.response;
  } catch {
    return null;
  }
};
```

## React Query 훅 패턴

```typescript
// hooks/useStore.ts
export const useStore = (id: string) => {
  return useQuery({
    queryKey: ["store", id],
    queryFn: () => getStore(id),
  });
};
```

**상태 구분:**

- 서버 데이터 → React Query (`useQuery`, `useMutation`)
- UI 상태 → `useState`
- 로컬 저장소 → `useState` + AsyncStorage

## 비동기 처리 패턴

**race condition 방지:**

```typescript
useEffect(() => {
  let isCanceled = false;
  fetchData(keyword).then((data) => {
    if (!isCanceled) setData(data);
  });
  return () => {
    isCanceled = true;
  };
}, [keyword]);
```

**타이머 정리:**

```typescript
const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
useEffect(() => {
  return () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };
}, []);
```
