# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

주점 웨이팅 관리를 위한 React Native(Expo 54) 모바일 앱. 카카오 OAuth, TanStack React Query, Emotion Native, TypeScript strict 모드.

## 명령어

```bash
yarn install              # 의존성 설치 (Yarn 4, node-modules 링커)
yarn expo start                # Expo 개발 서버 실행
yarn expo run:ios                  # iOS 시뮬레이터 실행
yarn expo run:android              # Android 에뮬레이터 실행
```

테스트 러너, 린터, 포매터는 설정되어 있지 않습니다.

## 아키텍처

`src/` 하위 3계층 구조:

- **`screens/`** — 라우트 단위 화면. 반드시 `ScreenLayout`으로 감싸야 함. feature 컴포넌트를 조합하되 최소한의 로직만 포함.
- **`features/`** — `screens/`와 1:1 대응하는 기능 모듈. `components/`, `hooks/`, `model/`(API 함수 + Zod 스키마) 구조.
- **`shared/`** — 공통 요소: UI(`ui/`), axios 인스턴스(`api/`), 애니메이션 훅(`interaction/`), 유틸(`utils/`), 이미지(`assets/`).

네비게이션: Splash → Login → Tabs(Main, Search, Map, MyPage) + 탭바 없는 스택 화면들. 라우트 타입은 `routes.app.d.ts`에서 선언 병합으로 `AppRouteMap`에 추가.

API 계층: `shared/api/`에 `api`, `storeApi`, `usersApi` 3개 axios 인스턴스. React Query 커스텀 훅이 `useQuery`/`useMutation` 래핑, Zod로 응답 검증.

경로 별칭: `@/*` → `./src/*`. 항상 `@/` 임포트 사용.

## 주의 사항

- IMPORTANT: axios 응답 인터셉터가 `response.data`를 자동 추출하므로, API 함수에서 `response.data.data`처럼 이중 접근하지 말 것.
- 환경변수는 `.env.local`에 정의하고 `babel-plugin-inline-dotenv`로 빌드 시 주입. `process.env.SERVER_URI`, `process.env.KAKAO_NATIVE_APP_KEY`로 접근.
- 토큰은 `expo-secure-store`에 저장. 모든 API 요청에 인터셉터로 자동 부착됨.
