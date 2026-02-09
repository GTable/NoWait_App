# 코드 스타일 컨벤션

## 파일 구조

```tsx
// 1. import (외부 라이브러리 → @/ 절대경로 → 상대경로 → styled)
import { useNavigation } from "@react-navigation/native";
import { colors } from "@/app/styles/colors";
import { searchStores } from "../model/SearchApi";
import styled from "@emotion/native";

// 2. interface/type
interface Props { ... }

// 3. 상수
const MAX_COUNT = 10;

// 4. 컴포넌트
export const Component = ({ ... }: Props) => { ... };

// 5. styled (E 객체)
const E = { ... };
```

**임포트 경로:**

- `@/` — 다른 레이어 참조 (screens→features, features→shared)
- `../` — 같은 feature 내부만

## 네이밍 컨벤션

| 항목     | 패턴             | 예시                                    |
| -------- | ---------------- | --------------------------------------- |
| 폴더     | snake_case       | `store_detail/`, `bottom_tab/`          |
| 파일     | PascalCase       | `SearchComponents.tsx`                  |
| 컴포넌트 | PascalCase       | `MenuCard`                              |
| 함수     | camelCase        | `searchStores()`                        |
| 훅       | use + PascalCase | `useSearchStores`                       |
| API 함수 | 동사 + 명사      | `getAllStores()`                        |
| Props    | 컴포넌트 + Props | `MenuCardProps`                         |
| 상수     | UPPER_SNAKE_CASE | `MAX_RECENT_SEARCHES`                   |
| 핸들러   | handle~          | `handlePress` (내부), `onPress` (Props) |
| styled   | 항상 `E`         | `const E = { Container: ... }`          |

## 컴포넌트 정의

```tsx
// ✅ 일반 컴포넌트
export const MenuCard = ({ name, price }: MenuCardProps) => {
  return <E.Container>...</E.Container>;
};

// ✅ 스크린 컴포넌트
const MainScreen = () => {
  return <ScreenLayout>...</ScreenLayout>;
};
export default MainScreen;

// ❌ React.FC 금지
export const MenuCard: React.FC<MenuCardProps> = ...
```

## 타입 안전성 (엄수)

```tsx
// ❌ 금지
const response = await api.post("/login") as LoginResponse;
const data: any = ...;
const value = obj.prop!;

// ✅ 필수
const response = LoginResponseSchema.parse(await api.post("/login"));
const data: unknown = ...;
const value = obj?.prop ?? defaultValue;
```

**규칙:**

- `any` 타입 금지 → `unknown` + 타입 가드
- `as` 캐스팅 금지 → Zod `.parse()`
- `!` 최소화 → `?.` + `??`

## API 응답 검증

```tsx
// model/StoreApi.ts
const StoreResponseSchema = z.object({
  success: z.boolean(),
  response: z.object({ id: z.number(), name: z.string() }),
});

export interface Store {
  id: number;
  name: string;
}

export const getStore = async (id: string): Promise<Store | null> => {
  try {
    const raw = await storeApi.get(`/${id}`);
    const validated = StoreResponseSchema.parse(raw);
    return validated.response;
  } catch {
    return null;
  }
};
```

**주의:** axios 인터셉터가 `response.data` 추출 → raw 직접 parse

## 에러 처리

```tsx
// API: 검증 실패 시 null 반환
catch { return null; }

// 훅: 에러 로깅
catch (error: unknown) {
  console.error("조회 실패:", error);
}
```

## 스타일링

```tsx
const E = {
  Container: styled.View({
    flex: 1,
    backgroundColor: colors.white[100],
  }),
  Title: styled.Text({
    ...typography["headline-24-bold"],
    color: colors.primary,
  }),
};
```

**테마 토큰:** `@/app/styles/colors`, `@/app/styles/typography`

## 주석 원칙

- 기본 원칙: 최소화 (코드가 자명해야 함)
- 스타일 주석 금지

**JSDoc 필수 대상:**

- `shared/` 내 export 함수·훅·컴포넌트 (`@param`, `@returns`)
- `features/*/hooks/` 내 커스텀 훅 — 역할·동작을 명시하여 다른 개발자가 빠르게 이해할 수 있도록
- Props: 외부 노출 interface만

**JSX 섹션 주석 허용:**

- `screens/` 및 `features/*/components/`의 JSX 내 섹션 구분 주석 허용
- 비개발자도 코드의 기능·역할을 파악할 수 있도록 `{/* 섹션명 */}` 사용
- UI 구조가 복잡한 컴포넌트에서는 각 영역이 어떤 역할인지 명시

```tsx
// ✅ 스크린 — 섹션 구분 주석 허용
const MainScreen = () => (
  <ScreenLayout>
    {/* 상단 헤더 */}
    <Header />
    {/* 정렬된 주점 리스트 */}
    <SortedStoresSection />
  </ScreenLayout>
);

// ✅ feature 컴포넌트 — UI 영역 구분 주석 허용
const SortedStoresSection = () => (
  <E.Container>
    {/* 정렬 옵션 선택 버튼 */}
    <SortButton onPress={showModal} />
    {/* 가로 스크롤 부스 카드 리스트 */}
    <E.HorizontalCardList horizontal>
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </E.HorizontalCardList>
  </E.Container>
);

// ✅ 훅 — JSDoc으로 역할 명시
/**
 * 정렬 옵션에 따른 주점 목록 조회
 * - 30초마다 자동 갱신
 */
export const useSortedStores = (sortOption: SortOption) => { ... };

// ❌ 자명한 곳에 불필요한 주석
const E = {
  // 컨테이너 스타일  ← 금지
  Container: styled.View({ ... }),
};
```
