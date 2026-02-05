# Git 커밋 & 브랜치 규칙

## 커밋 메시지 포맷

```
<type>: <subject>

[optional body]

[optional footer]
```

**규칙:**

- `type`: 소문자, 영어
- `subject`: 한글 또는 영어, 50자 이내, 마침표 없음
- body: 선택사항, 72자마다 줄바꿈
- footer: Breaking Changes, 이슈 번호 참조

## 커밋 타입

| 타입       | 설명                                    | 예시                                 |
| ---------- | --------------------------------------- | ------------------------------------ |
| `feat`     | 새 기능 추가                            | `feat: 주점 검색 기능 추가`          |
| `fix`      | 버그 수정                               | `fix: 대기 등록 중복 방지`           |
| `refactor` | 코드 리팩토링 (기능 변경 없음)          | `refactor: React.FC 제거`            |
| `style`    | 코드 포맷팅, 세미콜론 추가 (로직 변경X) | `style: import 순서 정렬`            |
| `docs`     | 문서 수정                               | `docs: README 환경 설정 추가`        |
| `test`     | 테스트 추가/수정                        | `test: 로그인 훅 테스트 추가`        |
| `chore`    | 빌드/패키지 설정 변경                   | `chore: Expo SDK 54 업데이트`        |
| `perf`     | 성능 개선                               | `perf: 이미지 로딩 최적화`           |
| `ci`       | CI/CD 설정                              | `ci: GitHub Actions 워크플로우 추가` |
| `revert`   | 이전 커밋 되돌리기                      | `revert: feat: 검색 기능 추가`       |

## 커밋 예시

### 기본 커밋

```bash
feat: 주점 북마크 기능 추가
fix: iOS에서 키보드가 화면을 가리는 버그 수정
refactor: 주석 원칙에 따른 코드 정리 및 가독성 개선
docs: .claude 폴더 가이드 추가
chore: axios 1.13.2 → 1.13.5 업데이트
```

### Body 포함

```bash
feat: 대기 현황 자동 갱신 기능 추가

- 30초 간격으로 React Query refetch
- 백그라운드에서도 동작
- 네트워크 에러 시 재시도 로직 추가
```

### Breaking Change

```bash
feat!: API 응답 구조 변경

BREAKING CHANGE: response.data.data 접근 방식을 response로 변경.
axios 인터셉터가 자동으로 data를 추출하므로 기존 코드 수정 필요.
```

### 이슈 연결

```bash
fix: 대기 등록 시 앱이 멈추는 문제 해결

Closes #123
```

## 브랜치 네이밍

```
<type>/<issue-number>-<description>
```

**예시:**

```
feat/42-bookmark-feature
fix/38-keyboard-overlay
refactor/55-comment-cleanup
docs/60-add-contributing-guide
```

**메인 브랜치:**

- `main` - 프로덕션 배포 브랜치
- `develop` - 개발 통합 브랜치 (사용 시)

## PR 규칙

**제목:**

```
[타입] 간단한 설명
```

**예시:**

```
[Feat] 주점 북마크 기능 추가
[Fix] iOS 키보드 오버레이 버그 수정
[Refactor] 주석 정리 및 코드 스타일 개선
```

**내용 템플릿:**

```markdown
## 변경 사항

- 추가/수정/삭제된 내용 요약

## 테스트

- [ ] iOS 시뮬레이터 테스트 완료
- [ ] Android 에뮬레이터 테스트 완료
- [ ] 실제 디바이스 테스트 완료

## 스크린샷 (UI 변경 시)

[첨부]

## 관련 이슈

Closes #123
```

## 자주 사용하는 명령어

```bash
# 스테이징
git add .                                    # 모든 변경사항
git add src/features/login/                  # 특정 폴더만

# 커밋
git commit -m "feat: 로그인 기능 추가"

# 커밋 수정 (push 전)
git commit --amend                           # 마지막 커밋 메시지 수정
git commit --amend --no-edit                 # 파일만 추가

# 브랜치
git checkout -b feat/42-bookmark-feature     # 새 브랜치 생성 및 전환
git branch -d feat/42-bookmark-feature       # 브랜치 삭제

# 동기화
git pull origin main                         # 최신 코드 받기
git push origin feat/42-bookmark-feature     # 브랜치 푸시

# 되돌리기
git reset HEAD~1                             # 마지막 커밋 취소 (변경사항 유지)
git reset --hard HEAD~1                      # 마지막 커밋 취소 (변경사항 삭제)
git revert <commit-hash>                     # 특정 커밋 되돌리기 (새 커밋 생성)
```

## 커밋 전 체크리스트

- [ ] 불필요한 console.log 제거
- [ ] 테스트 코드 (있다면) 통과
- [ ] 린터/포매터 오류 없음
- [ ] `.env.local` 같은 민감한 파일 제외
- [ ] 큰 변경사항은 작은 단위로 분리
- [ ] 커밋 메시지가 변경 내용을 명확히 설명

## 나쁜 커밋 예시

```bash
# ❌ 너무 모호함
git commit -m "수정"
git commit -m "fix bug"
git commit -m "update"

# ❌ 타입 없음
git commit -m "북마크 기능 추가"

# ❌ 여러 작업을 한 커밋에
git commit -m "feat: 검색 기능 추가 및 버그 수정 및 문서 업데이트"

# ✅ 올바른 예시
git commit -m "feat: 주점 검색 기능 추가"
git commit -m "fix: 검색 결과 중복 표시 버그 수정"
git commit -m "docs: 검색 API 문서 추가"
```

## 협업 팁

1. **커밋 단위**: 하나의 논리적 변경사항만 포함
2. **자주 커밋**: 작은 단위로 자주 커밋 (롤백 쉬움)
3. **푸시 전 검토**: `git log --oneline` 으로 확인
4. **Merge 전 동기화**: `git pull origin main` 후 충돌 해결
5. **리뷰 반영**: PR 피드백은 새 커밋으로 추가 (force push 지양)

---

**최종 업데이트:** 2026-02-05
