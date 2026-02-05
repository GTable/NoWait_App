# NoWait App 🍻

대학 축제 주점의 웨이팅을 간편하게 관리할 수 있는 모바일 애플리케이션입니다.

## 📱 주요 기능

### 사용자

- **카카오 간편 로그인**: 빠르고 안전한 소셜 로그인
- **실시간 대기 현황**: 주점별 현재 대기 팀 수 확인
- **웨이팅 등록**: 원하는 주점에 대기 신청
- **검색 및 필터**: 주점 이름 검색 및 대기 팀 수로 정렬
- **북마크**: 관심 주점 저장 및 빠른 접근
- **메뉴 및 공지사항**: 주점 상세 정보 확인

### 기술적 특징

- **실시간 데이터**: 30초 간격 자동 리패치로 최신 대기 현황 유지
- **멱등성 보장**: 중복 대기 등록 방지
- **오프라인 지원**: 최근 검색어 로컬 저장
- **부드러운 UX**: React Native Reanimated 기반 애니메이션

## 🛠 기술 스택

### Core

- **React Native** (0.81.5) - 크로스 플랫폼 모바일 개발
- **Expo** (~54.0) - 개발 및 배포 플랫폼
- **TypeScript** (~5.9) - 타입 안전성

### State & Data

- **TanStack React Query** (^5.90) - 서버 상태 관리
- **Axios** (^1.13) - HTTP 클라이언트
- **Zod** (^4.1) - 런타임 데이터 검증

### UI & Animation

- **Emotion Native** (^11.11) - CSS-in-JS 스타일링
- **React Native Reanimated** (~4.1) - 고성능 애니메이션
- **Expo Linear Gradient** - 그라데이션 효과
- **Expo Blur** - 블러 효과

### Navigation & Storage

- **React Navigation** (^7.1) - 화면 네비게이션
- **Expo Secure Store** - 안전한 토큰 저장
- **AsyncStorage** - 로컬 데이터 저장

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+
- Yarn 4.12.0+
- iOS: Xcode 14+, macOS
- Android: Android Studio, JDK 17+

### 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn expo start

# iOS 시뮬레이터
yarn expo run:ios

# Android 에뮬레이터
yarn expo run:android
```

### 환경 변수 설정

`.env.local` 파일을 프로젝트 루트에 생성:

```env
SERVER_URI=https://api.example.com
KAKAO_NATIVE_APP_KEY=your_kakao_app_key
```

## 📁 프로젝트 구조

```
src/
├── app/                    # 전역 설정
│   ├── config/routes/      # 라우팅 설정
│   ├── layout/             # 레이아웃 컴포넌트
│   ├── providers/          # Context Providers
│   └── styles/             # 디자인 토큰 (색상, 타이포그래피)
│
├── screens/                # 화면 단위 (라우트별)
│   ├── splash/            # 스플래시 화면
│   ├── login/             # 로그인 화면
│   ├── phone_number/      # 전화번호 입력
│   ├── main/              # 메인 홈 화면
│   ├── search/            # 검색 화면
│   ├── store_detail/      # 주점 상세
│   └── waiting_register/  # 웨이팅 등록
│
├── features/               # 기능 모듈 (screens와 1:1 대응)
│   └── [feature_name]/
│       ├── components/    # UI 컴포넌트
│       ├── hooks/         # 커스텀 훅
│       └── model/         # API 함수 + Zod 스키마
│
└── shared/                 # 공통 리소스
    ├── ui/                # 재사용 UI 컴포넌트
    ├── api/               # Axios 인스턴스
    ├── interaction/       # 애니메이션 훅
    ├── utils/             # 유틸리티 함수
    └── assets/            # 이미지, 폰트
```

## 🏗 아키텍처

### 3계층 구조

1. **screens/** - 화면 레이아웃 및 기능 조합
2. **features/** - 화면별 비즈니스 로직
3. **shared/** - 공통 요소

### 주요 패턴

- **FSD** (Feature-Sliced Design) 영감
- **Compound Component** 패턴
- **Custom Hooks** 기반 로직 분리
- **Zod Schema** 기반 타입 안전성

## 🔄 주요 플로우

### 로그인 플로우

```
Splash → 토큰 확인
  ├─ 토큰 있음 → Main (Tabs)
  └─ 토큰 없음 → Login
      └─ 카카오 로그인 성공
          ├─ 신규 사용자 → PhoneNumber → Main
          └─ 기존 사용자 → Main
```

### 웨이팅 등록 플로우

```
Main → StoreDetail → WaitingRegister
  → 인원 선택 → 등록 확인
  → WaitingSuccess → Main
```

## 📝 개발 가이드

### AI 개발 지원

프로젝트에는 Claude AI를 위한 상세한 개발 가이드가 포함되어 있습니다:

- **[.claude/CLAUDE.md](.claude/CLAUDE.md)** - AI를 위한 프로젝트 개요
- **[.claude/rules/architecture.md](.claude/rules/architecture.md)** - 아키텍처 가이드
- **[.claude/rules/code-style.md](.claude/rules/code-style.md)** - 코드 스타일 컨벤션
- **[.claude/rules/animation.md](.claude/rules/animation.md)** - 애니메이션 가이드

### 주요 명령어

```bash
yarn expo start              # Expo 개발 서버 실행
yarn expo run:ios               # iOS 앱 실행
yarn expo run:android           # Android 앱 실행
```

## 🎨 디자인 시스템

### 색상 팔레트

- **Primary**: `#FF4103` (오렌지)
- **Black Scale**: 100 → 5 (20단계, #000000 → #FAFAFA)
- **Navy Scale**: 100 → 5 (20단계, #16191E → #F1F2F5)
- **White**: `#FFFFFF` (100만 존재)
- **Cool Black**: `#16191E` (100만 존재)

### 타이포그래피

- **Font**: Pretendard (Bold, SemiBold, Medium, Regular)
- **Presets**: headline-24-bold, text-16-regular 등

## 🔒 보안

- **Expo Secure Store**: 민감한 토큰 암호화 저장
- **Axios Interceptor**: 자동 토큰 부착 및 에러 처리
- **Environment Variables**: `.env.local`을 통한 안전한 설정 관리
- **.gitignore**: 민감 정보 버전 관리 제외

## 📄 라이선스

이 프로젝트는 개인 프로젝트이며 저작권은 개발자에게 있습니다.

## 👥 기여

현재 비공개 프로젝트입니다.

---

**Made with ❤️ using React Native & Expo**

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
