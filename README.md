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

## 주석 스타일 가이드

프로젝트 전반에 걸쳐 일관된 주석 스타일을 유지합니다.

### 원칙

1. **최소한의 주석**: 코드 자체가 설명적이어야 하며, 주석은 꼭 필요한 경우만 사용
2. **JSX 주석**: 의미 있는 섹션 구분에만 사용
3. **함수/로직 주석**: 특별한 설명이 필요한 경우만 작성
4. **스타일 주석**: 작성하지 않음 (네이밍으로 충분히 설명)

### JSX 주석

**사용하는 경우:**

- 화면의 주요 섹션을 구분할 때
- 복잡한 UI 구조에서 영역을 명확히 할 때

```tsx
return (
  <ScreenLayout>
    {/* 상단 헤더 */}
    <Header />

    {/* 메인 콘텐츠 영역 */}
    <Content>
      <Title>제목</Title>

      {/* 검색 결과 리스트 */}
      <SearchResults data={results} />
    </Content>

    {/* 하단 버튼 */}
    <ButtonWrapper>
      <CustomButton>확인</CustomButton>
    </ButtonWrapper>
  </ScreenLayout>
);
```

**사용하지 않는 경우:**

- 명확한 컴포넌트/변수명으로 의미가 충분한 경우
- 간단한 UI 요소 (단일 텍스트, 이미지 등)

```tsx
// ❌ 불필요한 주석
return (
  <E.Container>
    {/* 타이틀 */}
    <E.Title>제목</E.Title>
    {/* 설명 */}
    <E.Description>설명</E.Description>
  </E.Container>
);

// ✅ 좋은 예
return (
  <E.Container>
    <E.Title>제목</E.Title>
    <E.Description>설명</E.Description>
  </E.Container>
);
```

### 함수/로직 주석

**사용하는 경우:**

- 복잡한 비즈니스 로직
- 특별한 처리가 필요한 경우
- 외부 라이브러리의 특수한 사용법

```tsx
// 패딩 값이 변할 때 적용되는 애니메이션 스타일
const paddingAnimatedStyle = useAnimatedStyle(() => ({
  paddingHorizontal: paddingH.value,
}));

// 필수 약관 체크 후 확인 처리
const onConfirm = () => {
  if (!isRequiredTermsChecked) return;
  handleConfirm();
};
```

**사용하지 않는 경우:**

- 함수명으로 의도가 명확한 경우
- 간단한 상태 업데이트
- 네비게이션 핸들러

```tsx
// ❌ 불필요한 주석
// 뒤로가기
const handleBack = () => {
  navigation.goBack();
};

// ✅ 좋은 예
const handleBack = () => {
  navigation.goBack();
};
```

### 유틸리티 함수 주석 (JSDoc)

재사용 가능한 유틸리티 함수는 JSDoc 형식으로 작성:

```tsx
/**
 * 공지사항 HTML 문자열을 줄바꿈 텍스트로 변환하는 유틸리티
 *
 * @param noticeContent - "<p>신분증 지참</p><p>열파참</p>" 형태의 공지 문자열
 * @returns "신분증 지참\n열파참" 형태의 줄바꿈 텍스트
 *
 * @example
 * formatNoticeContent("<p>신분증 지참</p><p>열파참</p>") // "신분증 지참\n열파참"
 */
export const formatNoticeContent = (noticeContent: string): string => {
  return noticeContent
    .split(/<\/p>/)
    .map((line) => line.replace(/<p>/g, "").trim())
    .filter(Boolean)
    .join("\n");
};
```

### 스타일 주석

스타일 객체에는 주석을 작성하지 않습니다. 스타일 이름이 충분히 설명적이어야 합니다.

```tsx
// ❌ 불필요한 주석
const E = {
  // 메인 컨테이너
  Container: styled.View({
    flex: 1,
  }),
  // 제목 텍스트
  Title: styled.Text({
    fontSize: 24,
  }),
};

// ✅ 좋은 예
const E = {
  Container: styled.View({
    flex: 1,
  }),
  Title: styled.Text({
    fontSize: 24,
  }),
};
```

### 타입/인터페이스 주석

복잡한 타입이나 외부에 노출되는 Props는 설명을 추가할 수 있습니다:

```tsx
interface PersonCountStepperProps {
  /** 현재 인원수 */
  value: number;
  /** 인원수 변경 핸들러 */
  onChange: (value: number) => void;
  /** 최소 인원수 (기본값: 1) */
  min?: number;
  /** 최대 인원수 (기본값: 99) */
  max?: number;
}
```

## 폰트

프로젝트에는 Pretendard 폰트가 포함되어 있습니다:

- Pretendard-Bold
- Pretendard-SemiBold
- Pretendard-Medium
- Pretendard-Regular

폰트는 Splash 화면에서 자동으로 로드됩니다.

## 인터랙션 (Press Animation)

프로젝트에는 프레스 인터랙션을 위한 공통 훅이 포함되어 있습니다.

### 디자이너로부터 전달받는 값

| 항목        | 설명                           | 예시                    |
| ----------- | ------------------------------ | ----------------------- |
| `scale`     | 눌렀을 때 축소 비율            | `0.96` (96%)            |
| `stiffness` | 스프링 강도 (높을수록 빠름)    | `1000`                  |
| `damping`   | 스프링 감쇠 (높을수록 덜 튀김) | `55`                    |
| `opacity`   | 눌렀을 때 투명도               | `1` (변화 없음)         |
| `dimColor`  | 눌렀을 때 오버레이 색상        | `#0220470D` (5% 투명도) |

### usePressScaleAnimation 훅

컴포넌트에 프레스 애니메이션을 적용할 때 사용합니다.

```tsx
import { usePressScaleAnimation } from "@/shared/interaction/usePressScaleAnimation";
import Animated from "react-native-reanimated";
import { Pressable } from "react-native";

const ANIMATION_CONFIG = {
  scale: 0.96, // 눌렀을 때 크기
  opacity: 1, // 눌렀을 때 투명도
  dimColor: "#0220470D", // dim 오버레이 색상
  stiffness: 1000, // 스프링 강도
  damping: 55, // 스프링 감쇠
};

const MyComponent = () => {
  const {
    dimStyle, // dim 배경색 스타일
    dimAnimatedStyle, // dim opacity 애니메이션
    animatedStyle, // scale/opacity 애니메이션
    handlePressIn, // onPressIn 핸들러
    handlePressOut, // onPressOut 핸들러
  } = usePressScaleAnimation(ANIMATION_CONFIG);

  return (
    <E.Wrapper>
      {/* dim 오버레이 */}
      <E.Dim pointerEvents="none" style={[dimStyle, dimAnimatedStyle]} />

      {/* scale/opacity 애니메이션 영역 */}
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          {/* 내용 */}
        </Pressable>
      </Animated.View>
    </E.Wrapper>
  );
};

const E = {
  Wrapper: styled.View({
    position: "relative",
    width: "100%",
  }),
  Dim: styled(Animated.View)({
    position: "absolute",
    top: 0,
    left: 14, // dim 영역 좌우 여백
    right: 14,
    bottom: 0,
    borderRadius: 15.4,
    zIndex: 1,
  }),
};
```

### StoreComponent 패딩 애니메이션

주점 컴포넌트는 눌렀을 때 수평 패딩이 함께 변경됩니다. `usePressScaleAnimation`과 별도로 패딩 애니메이션을 추가합니다.

```tsx
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const BASE_PADDING = 20; // 기본 패딩
const PRESSED_PADDING = 14; // 눌렀을 때 패딩
const SPRING_CONFIG = { damping: 55, stiffness: 1000 };

const StoreComponent = () => {
  const {
    dimStyle,
    dimAnimatedStyle,
    animatedStyle,
    handlePressIn,
    handlePressOut,
  } = usePressScaleAnimation(ANIMATION_CONFIG);

  // 패딩 애니메이션
  const paddingH = useSharedValue(BASE_PADDING);

  const paddingAnimatedStyle = useAnimatedStyle(() => ({
    paddingHorizontal: paddingH.value,
  }));

  const onPressIn = () => {
    handlePressIn();
    paddingH.value = withSpring(PRESSED_PADDING, SPRING_CONFIG);
  };

  const onPressOut = () => {
    handlePressOut();
    paddingH.value = withSpring(BASE_PADDING, SPRING_CONFIG);
  };

  return (
    <E.Wrapper>
      <E.Dim pointerEvents="none" style={[dimStyle, dimAnimatedStyle]} />
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          {/* Container를 Animated.View로 만들고 paddingAnimatedStyle 적용 */}
          <E.Container style={paddingAnimatedStyle}>...</E.Container>
        </Pressable>
      </Animated.View>
    </E.Wrapper>
  );
};
```

### CustomButton 애니메이션

버튼에 프레스 애니메이션을 적용할 때는 `animated` prop을 사용합니다.

```tsx
import { CustomButton } from "@/shared/ui/CustomButton";

// 애니메이션 적용
<CustomButton variant="rounded12" animated onPress={handlePress}>
  확인하기
</CustomButton>

// 애니메이션 없음 (기본)
<CustomButton variant="rounded12" onPress={handlePress}>
  확인하기
</CustomButton>
```

### 투명도 Hex 값 참고

| 투명도 | Hex  |
| ------ | ---- |
| 5%     | `0D` |
| 10%    | `1A` |
| 15%    | `26` |
| 20%    | `33` |
| 25%    | `40` |
| 50%    | `80` |
| 75%    | `BF` |
| 100%   | `FF` |

예: `#022047` + 5% 투명도 = `#0220470D`
