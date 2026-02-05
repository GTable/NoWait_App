# 프레스 애니메이션 가이드

## usePressScaleAnimation 훅

`@/shared/interaction/usePressScaleAnimation`으로 프레스 인터랙션 처리.

### 설정 값

| 항목        | 설명                           | 예시            |
| ----------- | ------------------------------ | --------------- |
| `scale`     | 눌렀을 때 축소 비율            | `0.96` (96%)    |
| `stiffness` | 스프링 강도 (높을수록 빠름)    | `1000`          |
| `damping`   | 스프링 감쇠 (높을수록 덜 튀김) | `55`            |
| `opacity`   | 눌렀을 때 투명도               | `1` (변화 없음) |
| `dimColor`  | 눌렀을 때 오버레이 색상        | `#0220470D`     |

### 기본 사용법

```tsx
import { usePressScaleAnimation } from "@/shared/interaction/usePressScaleAnimation";
import Animated from "react-native-reanimated";
import { Pressable } from "react-native";

const ANIMATION_CONFIG = {
  scale: 0.96,
  opacity: 1,
  dimColor: "#0220470D",
  stiffness: 1000,
  damping: 55,
};

const MyComponent = () => {
  const {
    dimStyle,           // dim 배경색 스타일
    dimAnimatedStyle,   // dim opacity 애니메이션
    animatedStyle,      // scale/opacity 애니메이션
    handlePressIn,
    handlePressOut,
  } = usePressScaleAnimation(ANIMATION_CONFIG);

  return (
    <E.Wrapper>
      <E.Dim pointerEvents="none" style={[dimStyle, dimAnimatedStyle]} />
      <Animated.View style={animatedStyle}>
        <Pressable onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
          {/* 내용 */}
        </Pressable>
      </Animated.View>
    </E.Wrapper>
  );
};
```

### CustomButton 애니메이션

`animated` prop으로 간편하게 적용:

```tsx
<CustomButton variant="rounded12" animated onPress={handlePress}>
  확인하기
</CustomButton>
```

### StoreComponent 패딩 애니메이션

주점 컴포넌트는 `usePressScaleAnimation`과 함께 패딩 애니메이션을 별도 추가:

```tsx
const BASE_PADDING = 20;
const PRESSED_PADDING = 14;
const SPRING_CONFIG = { damping: 55, stiffness: 1000 };

const paddingH = useSharedValue(BASE_PADDING);
const paddingAnimatedStyle = useAnimatedStyle(() => ({
  paddingHorizontal: paddingH.value,
}));

const onPressIn = () => {
  handlePressIn();
  paddingH.value = withSpring(PRESSED_PADDING, SPRING_CONFIG);
};
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
