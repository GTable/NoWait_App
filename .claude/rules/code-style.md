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

- 최소화 (코드가 자명해야 함)
- JSDoc: 공유 유틸만 (`@param`, `@returns`)
- 스타일 주석 금지
- Props: 외부 노출 interface만
