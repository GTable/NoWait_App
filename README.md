# NoWait App

## 시작하기

### 설치

```bash
yarn install
```

### 실행

```bash
yarn expo start
```

## 프로젝트 구조

```
src/
├── app/                    # 애플리케이션 전역 설정
│   ├── config/
│   │   └── routes/        # 라우터 설정
│   ├── layout/            # 공용 레이아웃 컴포넌트
│   ├── providers/         # Global Providers
│   └── styles/            # 전역 스타일
│
├── screens/               # 화면 단위 (각 라우트에 대응)
│   ├── splash/
│   ├── login/
│   ├── main/
│   ├── search/
│   ├── map/
│   ├── mypage/
│   └── store_detail/
│
├── features/              # 화면을 구성하는 기능 단위(screens와 내부 폴더 동일)
│   └── [feature_name]/
│       ├── components/    # 해당 기능의 컴포넌트
│       └── model/         # 상태 관리, 비즈니스 로직
│
└── shared/                # 공통으로 사용하는 요소
    ├── ui/                # 재사용 가능한 UI 컴포넌트
    ├── api/               # API 클라이언트
    ├── lib/               # 유틸리티, hooks
    ├── assets/            # 이미지, 폰트 등
    └── types/             # 전역 타입 정의
```

## 라우터 (Router)

이 프로젝트는 React Navigation을 사용합니다.

### 라우터 구조

```
Splash (초기 화면)
  ↓
Login (로그인 화면)
  ↓
Tabs (하단 탭바가 있는 메인 영역)
  ├── Main (홈)
  ├── Search (검색)
  ├── Map (지도)
  └── MyPage (마이페이지)

StoreDetail (주점 상세 - 탭바 없음)
```

### 새로운 화면 추가하는 방법

#### 1. Screen 파일 생성

`src/screens/[screen_name]/[ScreenName]Screen.tsx` 형식으로 생성합니다.

```tsx
// src/screens/example/ExampleScreen.tsx
import { ScreenLayout } from "@/app/layout/ScreenLayout";
import React from "react";
import { Text, View } from "react-native";

const ExampleScreen = () => {
  return (
    <ScreenLayout>
      <View>
        <Text>ExampleScreen</Text>
      </View>
    </ScreenLayout>
  );
};

export default ExampleScreen;
```

**중요**: 모든 화면은 `ScreenLayout`으로 감싸야 합니다. 이렇게 하면 SafeArea와 flex: 1이 자동으로 적용됩니다.

#### 2. 라우트 타입 정의

`src/app/config/routes/routes.app.d.ts`에 라우트 파라미터를 정의합니다.

```typescript
declare module "./routes.core" {
  export interface AppRouteMap {
    // 기존 라우트들...
    Example: undefined; // 파라미터가 없는 경우
    // 또는
    Example: { id: string }; // 파라미터가 있는 경우
  }
}
```

#### 3. AppRouter에 Screen 등록

`src/app/config/routes/AppRouter.tsx`에 화면을 추가합니다.

**탭바가 없는 화면 (Splash, Login처럼):**

```tsx
<Stack.Screen
  name="Example"
  component={ExampleScreen}
  options={{ headerShown: false }}
/>
```

**탭바가 있는 화면 (Main, Search처럼):**

`BottomTabNavigator` 내부에 추가합니다.

```tsx
<BottomTab.Screen
  name="Example"
  component={ExampleScreen}
  options={{ headerShown: false }}
/>
```

그리고 `routes.core.ts`의 `BottomTabRouteName` 타입에 추가합니다.

```typescript
export type BottomTabRouteName =
  | "Main"
  | "Map"
  | "Search"
  | "MyPage"
  | "Example";
```

### 화면 이동 방법

```tsx
import { useNavigation } from "@react-navigation/native";

const SomeComponent = () => {
  const navigation = useNavigation();

  // 기본 이동
  navigation.navigate("Example");

  // 파라미터와 함께 이동
  navigation.navigate("Example", { id: "123" });

  // 뒤로 가기
  navigation.goBack();

  // 스택 초기화하며 이동
  navigation.reset({
    index: 0,
    routes: [{ name: "Login" }],
  });
};
```

## Screen Layout

모든 화면 컴포넌트는 `ScreenLayout`으로 감싸야 합니다.

```tsx
import { ScreenLayout } from "@/app/layout/ScreenLayout";

const YourScreen = () => {
  return <ScreenLayout>{/* 화면 내용 */}</ScreenLayout>;
};
```

`ScreenLayout`은 다음을 제공합니다:

- SafeAreaView (노치 영역 자동 처리)
- flex: 1 (전체 화면 크기)

## Features 구조

각 화면을 구성하는 기능은 `features` 폴더에 분리합니다.
이때 폴더의 내부 구조는 `screens`와 1대1 대응 되어야 합니다.

```
features/
└── login/
    ├── components/
    │   ├── LoginButton.tsx
    │   └── EmailInput.tsx
    └── model/
        └── useLoginForm.ts
```

사용 예시:

```tsx
// screens/login/LoginScreen.tsx
import { ScreenLayout } from "@/app/layout/ScreenLayout";
import { LoginButton } from "@/features/login/components/LoginButton";

const LoginScreen = () => {
  return (
    <ScreenLayout>
      <LoginButton />
    </ScreenLayout>
  );
};
```

## 스타일링

이 프로젝트는 `@emotion/native`를 사용합니다.
이때 `E`를 사용하여 해당 페이지에만 영향을 미치도록 제한할 수 있어 깔끔하게 코드를 작성할 수 있습니다.

```tsx
import styled from "@emotion/native";

const E = {
  Container: styled.View({
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  }),

  Title: styled.Text({
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  }),
};

const MyComponent = () => {
  return (
    <E.Container>
      <E.Title>Title</E.Title>
    </E.Container>
  );
};
```

## 폰트

프로젝트에는 Pretendard 폰트가 포함되어 있습니다:

- Pretendard-Bold
- Pretendard-SemiBold
- Pretendard-Medium
- Pretendard-Regular

폰트는 Splash 화면에서 자동으로 로드됩니다.
