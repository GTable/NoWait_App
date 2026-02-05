# CLAUDE.md

**주점 웨이팅 관리 모바일 앱** — React Native (Expo 54), 카카오 OAuth, TypeScript strict 모드

## 프로젝트 구조

```
src/
├── screens/     # 라우트 단위 화면 (반드시 ScreenLayout으로 감싸기)
├── features/    # 기능 모듈 (components/, hooks/, model/)
└── shared/      # 공통 요소 (ui/, api/, interaction/, utils/, assets/)
```

**아키텍처 규칙:**

- `screens/` ↔ `features/` 1:1 대응
- `features/[name]/model/` — API 함수 + Zod 스키마 (훅 금지)
- `features/[name]/hooks/` — 커스텀 훅 (`use~` 파일)
- 임포트: `@/` 절대경로 사용 (같은 feature 내부만 `../` 허용)

## 필수 명령어

```bash
yarn install                    # 의존성 설치
yarn expo start                 # Expo 개발 서버
yarn ios                        # iOS 시뮬레이터
yarn android                    # Android 에뮬레이터
```

## 코드 스타일 (필수 준수)

@import [.claude/rules/code-style.md]
@import [.claude/rules/architecture.md]
@import [.claude/rules/animation.md]

**핵심 규칙:**

- 컴포넌트: `const Component = (props: Props) =>` (React.FC 금지)
- 타입: `interface` 우선, `any` 금지, `as` 캐스팅 금지
- API 응답: 반드시 Zod `.parse()` 검증
- 폴더명: snake_case, 파일명: PascalCase
- 주석: 최소화 (JSDoc은 공유 유틸만)

## 중요 주의 사항

**🚨 axios 이중 접근 금지:**

```typescript
// ❌ 잘못된 예
const data = response.data.data;

// ✅ 올바른 예 (인터셉터가 이미 response.data 추출)
const data = ResponseSchema.parse(response);
```

**🔐 인증:**

- 토큰: `expo-secure-store`에 자동 저장
- 모든 API 요청에 인터셉터로 자동 부착

**🌐 환경변수:**

- `.env.local`에 정의
- `process.env.SERVER_URI`, `process.env.KAKAO_NATIVE_APP_KEY`로 접근

**📱 네비게이션:**

- Splash → Login → Tabs (Main/Search/Map/MyPage)
- 라우트 타입: `routes.app.d.ts`에 `AppRouteMap` 선언 병합

## 테스트 / 빌드 / 배포

현재 설정 없음:

- 테스트 러너: 미설정
- 린터: 미설정
- 포매터: 미설정
- CI/CD: 미설정

## 문제 해결

**빌드 오류:**

- iOS: `cd ios && pod install && cd ..`
- Android: `cd android && ./gradlew clean && cd ..`

---

**최종 업데이트:** 2026-02-05
