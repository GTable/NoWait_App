# 모달 가이드

## 구조 개요

모달은 **ModalContext(오버레이)** + **모달 콘텐츠(개별 컴포넌트)** 2계층으로 구성.

- `ModalContext` — 배경 dim 오버레이 + 페이드 애니메이션 + 터치 닫기
- 모달 콘텐츠 — absolute 포지셔닝 + Reanimated 슬라이드 애니메이션

**RN `Modal` 컴포넌트 사용 금지** — ModalContext 오버레이와 이중 레이어 충돌 발생

## ModalContext 사용법

### Provider 배치

`AppRouter.tsx`의 `BottomTabNavigator`에서 탭 전체를 감쌈:

```tsx
<ModalProvider>
  <BottomTab.Navigator>...</BottomTab.Navigator>
</ModalProvider>
```

### useModal 훅

```tsx
const { isModalVisible, showModal, hideModal } = useModal();

// 열기
showModal();

// 닫기 (배경 터치 시 자동 호출됨)
hideModal();
```

**반환값:**

| 값               | 타입         | 설명                      |
| ---------------- | ------------ | ------------------------- |
| `isModalVisible` | `boolean`    | 모달 표시 여부            |
| `showModal`      | `() => void` | 오버레이 페이드인 + 표시  |
| `hideModal`      | `() => void` | 오버레이 페이드아웃 + 숨김 |

## 모달 콘텐츠 컴포넌트 작성

### 템플릿

```tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Dimensions } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SPRING_CONFIG = { damping: 20, stiffness: 150 };

interface ExampleModalProps {
  visible: boolean;
  onConfirm: () => void;
}

export const ExampleModal = ({ visible, onConfirm }: ExampleModalProps) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    translateY.value = visible
      ? withSpring(0, SPRING_CONFIG)
      : withSpring(SCREEN_HEIGHT, SPRING_CONFIG);
  }, [visible]);

  if (!visible) return null;

  return (
    <E.Wrapper pointerEvents="box-none">
      <Animated.View style={[CONTENT_WRAPPER_STYLE, slideStyle]}>
        <E.Content>
          {/* 모달 내용 */}
        </E.Content>
      </Animated.View>
    </E.Wrapper>
  );
};

const CONTENT_WRAPPER_STYLE = {
  position: "absolute" as const,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 10001,
};

const E = {
  Wrapper: styled.View({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10001,
    justifyContent: "flex-end",
  }),
  Content: styled.View({
    backgroundColor: colors.white[100],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 20,
  }),
};
```

### 핵심 규칙

1. **`onClose` prop 불필요** — 배경 터치 닫기는 ModalContext가 처리
2. **`visible` prop 필수** — `isModalVisible`을 전달받아 슬라이드 애니메이션 제어
3. **`pointerEvents="box-none"`** — Wrapper가 터치를 가로채지 않도록

## zIndex 규칙

| 레이어         | zIndex | 용도                  |
| -------------- | ------ | --------------------- |
| 오버레이 (dim) | 10000  | ModalContext 배경     |
| 모달 콘텐츠    | 10001  | 모달 컴포넌트 본체    |
| 컴포넌트 dim   | 1      | 프레스 애니메이션 dim |

## 애니메이션 설정

| 항목                | 값                              | 설명                       |
| ------------------- | ------------------------------- | -------------------------- |
| 오버레이 페이드     | `withTiming`, `250ms`           | ModalContext 배경 등장/퇴장 |
| 오버레이 opacity    | `0.6`                           | `rgba(0, 0, 0, 0.6)`      |
| 콘텐츠 슬라이드     | `withSpring`                    | 하단에서 올라오는 모션     |
| 슬라이드 스프링     | `{ damping: 20, stiffness: 150 }` | 부드러운 바운스           |

## 체크리스트

- [ ] RN `Modal` 사용하지 않음
- [ ] `useModal`의 `showModal` / `hideModal`로 열고 닫기
- [ ] 모달 콘텐츠에 `visible` prop 전달
- [ ] Wrapper에 `pointerEvents="box-none"` 적용
- [ ] zIndex: 오버레이 `10000`, 콘텐츠 `10001`
