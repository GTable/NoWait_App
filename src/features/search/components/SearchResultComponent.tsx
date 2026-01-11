import { colors } from "@/app/styles/colors";
import { StoreComponent } from "@/shared/ui/StoreComponent";
import styled from "@emotion/native";

interface Store {
  id: string;
  storeName: string;
  department: string;
  waitNumber?: number;
}

interface SearchResultComponentProps {
  /** 검색 결과 주점 목록 */
  stores: Store[];
  /** 주점 카드 클릭 시 실행될 콜백 함수 */
  onStorePress?: (storeId: string) => void;
}

/**
 * 검색 결과를 표시하는 컴포넌트
 * - 검색된 주점 목록을 카드 형태로 표시
 */
export const SearchResultComponent = ({
  stores,
  onStorePress,
}: SearchResultComponentProps) => {
  return (
    <E.Container>
      <E.SectionTitle>검색 결과</E.SectionTitle>
      {stores.map((store) => (
        <StoreComponent
          key={store.id}
          storeName={store.storeName}
          department={store.department}
          waitNumber={store.waitNumber}
          onPress={() => onStorePress?.(store.id)}
        />
      ))}
    </E.Container>
  );
};

const E = {
  Container: styled.View({
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
  }),

  SectionTitle: styled.Text({
    fontFamily: "Pretendard",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 16 * 1.44,
    letterSpacing: -0.16,
    color: colors.black[90],
    paddingHorizontal: 20,
  }),
};
