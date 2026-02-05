# 코드 스타일 컨벤션

## 파일 내부 코드 배열 순서

```
1. import (외부 라이브러리 → @/ 절대경로 → 상대경로 → styled)
2. interface / type 정의
3. 상수 (UPPER_SNAKE_CASE)
4. 컴포넌트 정의
5. E 객체 (styled 컴포넌트)
```

## 임포트 규칙

**순서:** 외부 라이브러리 → `@/` 절대경로 → 상대경로 → styled

```tsx
import { useNavigation } from "@react-navigation/native"; // 외부 라이브러리
import { colors } from "@/app/styles/colors"; // @/ 절대경로
import { searchStores } from "../model/SearchApi"; // 상대경로
import styled from "@emotion/native"; // styled (마지막)
```

**절대경로 vs 상대경로 기준:**

- `@/` 절대경로: 다른 레이어를 참조할 때 (screens→features, features→shared, screens→shared)
- 상대경로(`../`, `./`): 같은 feature 내부에서만 (`features/search/hooks/` → `features/search/model/`)

## 컴포넌트 정의

- `const` + 화살표 함수 + `export const` 사용
- 스크린 컴포넌트만 `export default` 사용
- `React.FC` 사용하지 않음

```tsx
// 일반 컴포넌트
export const SearchComponents = ({
  searchText,
  onClose,
}: SearchComponentsProps) => {
  return <E.Container>...</E.Container>;
};

// 스크린 컴포넌트
const MainScreen = () => {
  return <ScreenLayout>...</ScreenLayout>;
};
export default MainScreen;
```

## 네이밍 컨벤션

| 항목            | 패턴             | 예시                                            |
| --------------- | ---------------- | ----------------------------------------------- |
| 폴더명          | snake_case       | `store_detail/`, `phone_number/`, `bottom_tab/` |
| 파일명          | PascalCase       | `SearchComponents.tsx`, `useSearchStores.ts`    |
| 컴포넌트        | PascalCase       | `MenuCard`, `BoothCard`                         |
| 함수            | camelCase        | `searchStores()`, `formatPrice()`               |
| 훅              | use + PascalCase | `useSearchStores`, `useAllStores`               |
| API 함수        | 동사 + 명사      | `getAllStores()`, `registerWaiting()`           |
| 타입/interface  | PascalCase       | `SearchComponentsProps`, `StoreDetail`          |
| 상수            | UPPER_SNAKE_CASE | `MAX_RECENT_SEARCHES`, `BASE_PADDING`           |
| styled 객체     | 항상 `E`         | `const E = { ... }`                             |
| styled 컴포넌트 | PascalCase       | `E.SearchSection`, `E.CtaContainer`             |

## 이벤트 핸들러 네이밍

- 컴포넌트 내부 함수: `handle` + 동사/명사 (`handlePress`, `handleBack`, `handleNext`)
- Props 정의: `on` + 동사/명사 (`onPress`, `onClose`, `onSearchTextChange`)

```tsx
interface Props {
  onPress: () => void; // Props에서는 on~
}

const Component = ({ onPress }: Props) => {
  const handlePress = () => {
    // 내부에서는 handle~
    onPress();
  };
};
```

## 타입 정의

- `interface` 사용 (`type`보다 우선)
- Props는 같은 파일 상단에 정의
- Props 이름은 `컴포넌트명 + Props`

```tsx
interface MenuCardProps {
  name: string;
  price: number;
  imageUrl?: string; // 선택사항은 ?
  onPress?: () => void;
}
```

## Export 패턴

| 상황               | 패턴                                |
| ------------------ | ----------------------------------- |
| 스크린 컴포넌트    | `export default ScreenName`         |
| 일반 컴포넌트      | `export const ComponentName`        |
| 훅, API 함수, 타입 | `export const` / `export interface` |
| 모듈 내부 상수     | export 없음                         |

## 문자열 · 세미콜론

- 큰따옴표(`"`) 사용
- 세미콜론 항상 사용

## 타입 안전성

- `any` 타입 사용 금지. 에러 핸들링은 `catch (error: unknown)` + 타입 가드 사용.
- `as` 타입 캐스팅 금지. API 응답은 반드시 Zod 스키마로 검증.
- non-null assertion (`!`) 최소화. optional chaining (`?.`) + nullish coalescing (`??`) 사용.

```tsx
// ❌
const response = (await api.post("/login", data)) as LoginResponse;

// ✅
const response = LoginResponseSchema.parse(await api.post("/login", data));
```

## 에러 처리

- API 호출 실패: `console.error`로 로깅 + 사용자에게 알림 (toast 등)
- Zod 검증 실패: `null` 또는 빈 배열 반환
- 비동기 상태: `isLoading` 플래그로 로딩 UI 표시

```tsx
// API 함수: 검증 실패 시 null 반환
try {
  const response = ResponseSchema.parse(raw);
  return response;
} catch {
  return null;
}

// 훅: 에러 로깅 + 상태 처리
try {
  const data = await fetchData();
  setState(data);
} catch (error: unknown) {
  console.error("데이터 조회 실패:", error);
}
```

## 스타일링

`@emotion/native`의 `E` 객체 패턴. 파일 맨 아래에 배치.

```tsx
const E = {
  Container: styled.View({
    flex: 1,
    backgroundColor: colors.white[100],
    padding: 16,
  }),
  Title: styled.Text({
    ...typography["headline-24-bold"],
    color: colors.primary,
  }),
};
```

테마 토큰은 `@/app/styles/`에서 임포트:

- `colors` — primary: #FF4103, black/navy 100→5 스케일
- `typography` — Pretendard 폰트 프리셋

기본적으로 테마 토큰을 사용하되, 디자인 요구사항에 따라 토큰에 없는 색상/폰트가 필요한 경우 직접 값을 사용해도 무방.

## 주석 원칙

1. **최소한의 주석**: 코드 자체가 설명적이어야 함
2. **스타일 주석**: 작성하지 않음
3. **JSX 주석**: 복잡한 UI의 주요 섹션 구분에만
4. **JSDoc**: 공유 유틸리티 함수에만 (`@param`, `@returns`, `@example` 포함)
5. **타입/인터페이스**: 외부 노출 Props에만 `/** */` 주석

## 조건부 렌더링

```tsx
// 두 가지 분기: 삼항연산자
{
  showEmpty ? <E.Empty>없음</E.Empty> : <E.List>...</E.List>;
}

// 렌더링 여부만: &&
{
  isComplete && <E.CtaContainer>...</E.CtaContainer>;
}

// 데이터 안전: optional chaining + nullish coalescing
const stores = data?.pages.flatMap((page) => page.stores) ?? [];
```

## Props 전달

구조분해 사용. spread 사용하지 않음.

```tsx
export const BoothCard = ({
  publicCode,
  name,
  waitingCount,
  onPress,
}: BoothCardProps) => { ... };
```
